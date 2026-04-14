import React, { useEffect, useLayoutEffect, useRef, useSyncExternalStore } from 'react';
import { Button } from '@components/Button';
import { InputMessage } from '@components/InputMessage';
import type { DialogTopic } from '@/data/dialogTopics';
import { clearDraft, writeDraft } from '@/session/dialogDraftStore';
import { cn } from '@/lib/utils';
import clientAvatarDefault from '@avatar-icons/girl-character.svg';
import trainerAvatarSrc from '@avatar-icons/services/AI Traini.png';
import styles from './DialogChat.module.css';

export interface DialogChatProps {
  /** Initial chat messages rendered after the first client message */
  initialMessages?: Array<{ role: 'client' | 'user'; text: string }>;
  /** Static scripted dialog: advance questions and farewell in order; then onScriptedComplete */
  scriptedTopic?: DialogTopic;
  /** Called after the user sends the final reply (after farewell); no LLM */
  onScriptedComplete?: () => void;
  /** Show onboarding panel before dialog starts */
  showOnboarding?: boolean;
  /** Fires when the onboarding welcome panel visibility changes (for layout outside the chat, e.g. hiding page asides). */
  onOnboardingVisibilityChange?: (visible: boolean) => void;
  /** Onboarding welcome text shown before dialog start */
  onboardingWelcomeMessage?: string;
  /** Onboarding button title */
  onboardingButtonLabel?: string;
  /** First message from client after onboarding */
  firstClientMessage?: string;
  /** Placeholder for input */
  inputPlaceholder?: string;
  /** Input label (hidden in UI — kept for a11y overrides if needed) */
  inputLabel?: string;
  /** Summary line from ИИ-Тренажёр before the first client message (Figma 707:20652) */
  trainerIntroText?: string;
  /** Center label on the “start of dialog” divider */
  dialogStartLabel?: string;
  /** Shown on client bubbles when trainer intro is used */
  clientMessageTitle?: string;
  /** Client avatar image */
  clientAvatarSrc?: string;
  /** When false, scroll-to-latest control is suppressed (Figma has none) */
  enableScrollToLatestButton?: boolean;
  /** Additional class name */
  className?: string;
  /** Start chat feed from top on first render */
  startAtTop?: boolean;
  /** Always show scroll-to-latest button (for testing) */
  forceShowScrollToLatestButton?: boolean;
  /** Restore state from a saved in-progress draft (recovery). */
  bootstrapDraft?: { messages: Array<{ role: 'client' | 'user'; text: string }>; isOnboardingVisible: boolean };
  /** When set with persistDraft, incremental draft is written to storage. */
  draftSkillId?: string;
  /** Persist messages + onboarding for incomplete-session recovery. */
  persistDraft?: boolean;
}

/** User is "at bottom" when within this distance; also used for scroll-to-latest button visibility. */
const BOTTOM_STICK_ZONE_PX = 80;
const SCROLL_EPSILON_PX = 1;
/** Pause before the next scripted client line (simulated response time). */
const SCRIPTED_CLIENT_REPLY_DELAY_MS = 650;

function getDistanceToBottom(feed: HTMLElement): number {
  return feed.scrollHeight - feed.clientHeight - feed.scrollTop;
}

function scrollFeedToBottom(feed: HTMLElement, behavior: ScrollBehavior) {
  const maxTop = Math.max(0, feed.scrollHeight - feed.clientHeight);
  feed.scrollTo({ top: maxTop, behavior });
}

function subscribeReducedMotion(onChange: () => void): () => void {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}

function getReducedMotionSnapshot(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getReducedMotionServerSnapshot(): boolean {
  return false;
}

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
}
const DEFAULT_ONBOARDING_WELCOME =
  'Привет! Я — тренажёр, симулятор общения с реальным клиентом на основе искусственного интеллекта. С моей помощью сможешь практиковать навыки общения и отточить свои умения. Благодаря нашим тренировкам ты станешь увереннее и эффективнее в взаимодействии с клиентами. Удачи, у тебя все получится!';
const DEFAULT_ONBOARDING_BUTTON_LABEL = 'Поехали';
const DEFAULT_FIRST_CLIENT_MESSAGE = 'Здравствуйте! Мне нужно заказать документы.';

/** Same enter transition as onboarding bubble (double RAF + pre/enter classes). */
const ClientMessageArticle = React.forwardRef<
  HTMLElement,
  { ariaLabel: string; children: React.ReactNode }
>(function ClientMessageArticle({ ariaLabel, children }, ref) {
  const [isEntryActive, setEntryActive] = React.useState(false);
  const entryFrameRef = useRef<number | null>(null);

  React.useEffect(() => {
    setEntryActive(false);
    if (entryFrameRef.current !== null) {
      window.cancelAnimationFrame(entryFrameRef.current);
    }
    entryFrameRef.current = window.requestAnimationFrame(() => {
      entryFrameRef.current = window.requestAnimationFrame(() => {
        setEntryActive(true);
        entryFrameRef.current = null;
      });
    });
    return () => {
      if (entryFrameRef.current !== null) {
        window.cancelAnimationFrame(entryFrameRef.current);
      }
    };
  }, []);

  return (
    <article
      ref={ref}
      className={cn(
        styles.inboxMessage,
        styles.clientMessageBubbleBase,
        isEntryActive ? styles.clientMessageEnter : styles.clientMessagePreEnter
      )}
      aria-label={ariaLabel}
    >
      {children}
    </article>
  );
});

export const DialogChat: React.FC<DialogChatProps> = (props) => {
  const {
    initialMessages = [],
    scriptedTopic,
    onScriptedComplete,
    showOnboarding = true,
    onOnboardingVisibilityChange,
    onboardingWelcomeMessage = DEFAULT_ONBOARDING_WELCOME,
    onboardingButtonLabel = DEFAULT_ONBOARDING_BUTTON_LABEL,
    firstClientMessage = DEFAULT_FIRST_CLIENT_MESSAGE,
    inputPlaceholder = 'Отправить новое сообщение',
    inputLabel = 'Ввод ответа',
    trainerIntroText,
    dialogStartLabel = 'Начало диалога',
    clientMessageTitle = 'Клиент',
    clientAvatarSrc = clientAvatarDefault,
    enableScrollToLatestButton = true,
    className,
    startAtTop = false,
    forceShowScrollToLatestButton = false,
    bootstrapDraft,
    draftSkillId,
    persistDraft = false,
  } = props;

  const skipSyncFromPropsRef = useRef(!!bootstrapDraft);

  const [inputValue, setInputValue] = React.useState('');
  const [messages, setMessages] = React.useState<Array<{ role: 'client' | 'user'; text: string }>>(() => {
    if (bootstrapDraft) return bootstrapDraft.messages;
    if (scriptedTopic) return [];
    return initialMessages;
  });
  const [isOnboardingVisible, setOnboardingVisible] = React.useState(() =>
    bootstrapDraft ? bootstrapDraft.isOnboardingVisible : showOnboarding
  );
  const [isOnboardingEntryActive, setOnboardingEntryActive] = React.useState(false);
  const [onboardingEntryOffset, setOnboardingEntryOffset] = React.useState({ x: 0, y: 0 });
  const [isOnboardingTransitioning, setOnboardingTransitioning] = React.useState(false);
  const [showScrollToLatestButton, setShowScrollToLatestButton] = React.useState(false);
  const [awaitingScriptedClientReply, setAwaitingScriptedClientReply] = React.useState(false);
  const feedRef = useRef<HTMLDivElement>(null);
  const latestMessageRef = useRef<HTMLElement | null>(null);
  const stickToBottomRef = useRef(true);
  const pendingProgrammaticScrollRef = useRef(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const onboardingBubbleRef = useRef<HTMLElement | null>(null);
  const onboardingEntryFrameRef = useRef<number | null>(null);
  const scriptedFinalizeRef = useRef(false);
  const scriptedReplyTimeoutRef = useRef<number | null>(null);
  const awaitingScriptedClientReplyRef = useRef(false);

  const handleValueChange = (value: string) => {
    setInputValue(value);
  };

  const handleSend = (value: string) => {
    const plainText = value.replace(/<[^>]+>/g, '').trim();
    if (!plainText) return;

    if (scriptedTopic && scriptedTopic.questions.length >= 1) {
      if (scriptedFinalizeRef.current || awaitingScriptedClientReplyRef.current) {
        return;
      }
      const { questions, farewellMessage } = scriptedTopic;

      if (scriptedReplyTimeoutRef.current !== null) {
        clearTimeout(scriptedReplyTimeoutRef.current);
        scriptedReplyTimeoutRef.current = null;
      }

      awaitingScriptedClientReplyRef.current = true;
      setAwaitingScriptedClientReply(true);
      setMessages((prev) => {
        if (scriptedFinalizeRef.current) {
          return prev;
        }
        return [...prev, { role: 'user' as const, text: plainText }];
      });
      setInputValue('');

      scriptedReplyTimeoutRef.current = window.setTimeout(() => {
        scriptedReplyTimeoutRef.current = null;
        setMessages((prev) => {
          const k = prev.filter((m) => m.role === 'user').length;
          if (k < questions.length) {
            return [...prev, { role: 'client' as const, text: questions[k] }];
          }
          if (k === questions.length) {
            return [...prev, { role: 'client' as const, text: farewellMessage }];
          }
          if (scriptedFinalizeRef.current) {
            return prev;
          }
          scriptedFinalizeRef.current = true;
          queueMicrotask(() => {
            if (draftSkillId) {
              clearDraft(draftSkillId);
            }
            onScriptedComplete?.();
          });
          return prev;
        });
        awaitingScriptedClientReplyRef.current = false;
        setAwaitingScriptedClientReply(false);
      }, SCRIPTED_CLIENT_REPLY_DELAY_MS);

      return;
    }

    setMessages((prev) => [...prev, { role: 'user', text: plainText }]);
    setInputValue('');
  };

  useEffect(() => {
    scriptedFinalizeRef.current = false;
    awaitingScriptedClientReplyRef.current = false;
    setAwaitingScriptedClientReply(false);
    if (scriptedReplyTimeoutRef.current !== null) {
      clearTimeout(scriptedReplyTimeoutRef.current);
      scriptedReplyTimeoutRef.current = null;
    }
    if (skipSyncFromPropsRef.current) {
      skipSyncFromPropsRef.current = false;
      return;
    }
    if (scriptedTopic) {
      setMessages([]);
      return;
    }
    setMessages(initialMessages);
  }, [initialMessages, scriptedTopic]);

  useEffect(() => {
    if (!persistDraft || !draftSkillId) return;
    writeDraft(draftSkillId, { status: 'in_progress', messages, isOnboardingVisible });
  }, [persistDraft, draftSkillId, messages, isOnboardingVisible]);

  useEffect(() => {
    if (!persistDraft || !draftSkillId) return;
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        writeDraft(draftSkillId, { status: 'in_progress', messages, isOnboardingVisible });
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [persistDraft, draftSkillId, messages, isOnboardingVisible]);

  useEffect(() => {
    return () => {
      if (scriptedReplyTimeoutRef.current !== null) {
        clearTimeout(scriptedReplyTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setOnboardingVisible(showOnboarding);
  }, [showOnboarding]);

  const onOnboardingVisibilityChangeRef = useRef(onOnboardingVisibilityChange);
  onOnboardingVisibilityChangeRef.current = onOnboardingVisibilityChange;

  useEffect(() => {
    onOnboardingVisibilityChangeRef.current?.(isOnboardingVisible);
  }, [isOnboardingVisible]);

  const updateScrollButtonVisibility = React.useCallback(() => {
    const feed = feedRef.current;

    if (!feed || isOnboardingVisible || isOnboardingTransitioning) {
      setShowScrollToLatestButton(false);
      return;
    }

    const isOverflowed = feed.scrollHeight > feed.clientHeight + 1;
    const distanceToBottom = getDistanceToBottom(feed);
    setShowScrollToLatestButton(isOverflowed && distanceToBottom > BOTTOM_STICK_ZONE_PX);
  }, [isOnboardingVisible, isOnboardingTransitioning]);

  const handleScrollToLatest = React.useCallback(() => {
    const feed = feedRef.current;
    if (!feed) return;
    stickToBottomRef.current = true;
    pendingProgrammaticScrollRef.current = true;
    const behavior: ScrollBehavior = prefersReducedMotion ? 'instant' : 'smooth';
    scrollFeedToBottom(feed, behavior);
    if (behavior === 'instant') {
      pendingProgrammaticScrollRef.current = false;
    }
    updateScrollButtonVisibility();
  }, [prefersReducedMotion, updateScrollButtonVisibility]);

  // Scroll to bottom when messages change (only while following / sticky bottom)
  useLayoutEffect(() => {
    const feed = feedRef.current;
    if (!feed) return;

    if (isOnboardingVisible || isOnboardingTransitioning) {
      updateScrollButtonVisibility();
      return;
    }

    let rafId2: number | null = null;
    const rafId1 = window.requestAnimationFrame(() => {
      rafId2 = window.requestAnimationFrame(() => {
        if (!stickToBottomRef.current) {
          updateScrollButtonVisibility();
          return;
        }
        pendingProgrammaticScrollRef.current = true;
        const behavior: ScrollBehavior = prefersReducedMotion ? 'instant' : 'smooth';
        scrollFeedToBottom(feed, behavior);
        if (behavior === 'instant') {
          pendingProgrammaticScrollRef.current = false;
        }
        updateScrollButtonVisibility();
      });
    });

    return () => {
      window.cancelAnimationFrame(rafId1);
      if (rafId2 !== null) {
        window.cancelAnimationFrame(rafId2);
      }
    };
  }, [
    messages,
    isOnboardingVisible,
    isOnboardingTransitioning,
    prefersReducedMotion,
    updateScrollButtonVisibility,
  ]);

  useEffect(() => {
    if (!isOnboardingVisible) {
      setOnboardingEntryActive(false);
      return;
    }

    setOnboardingEntryActive(false);
    if (onboardingEntryFrameRef.current !== null) {
      window.cancelAnimationFrame(onboardingEntryFrameRef.current);
    }

    onboardingEntryFrameRef.current = window.requestAnimationFrame(() => {
      onboardingEntryFrameRef.current = window.requestAnimationFrame(() => {
        setOnboardingEntryActive(true);
        onboardingEntryFrameRef.current = null;
      });
    });

    const element = onboardingBubbleRef.current;
    const rect = element?.getBoundingClientRect();
    if (rect) {
      setOnboardingEntryOffset({
        x: Math.max(1, Math.round(rect.left)),
        y: Math.max(1, Math.round(rect.top)),
      });
    }
  }, [isOnboardingVisible]);

  useEffect(() => {
    const feed = feedRef.current;
    if (!feed) return;

    const clearPendingProgrammaticScroll = () => {
      pendingProgrammaticScrollRef.current = false;
    };

    const handleFeedScroll = () => {
      if (pendingProgrammaticScrollRef.current) {
        const d = getDistanceToBottom(feed);
        if (d <= BOTTOM_STICK_ZONE_PX + SCROLL_EPSILON_PX) {
          pendingProgrammaticScrollRef.current = false;
        }
      } else {
        const d = getDistanceToBottom(feed);
        stickToBottomRef.current = d <= BOTTOM_STICK_ZONE_PX + SCROLL_EPSILON_PX;
      }
      updateScrollButtonVisibility();
    };

    const handleFeedScrollEnd = () => {
      if (pendingProgrammaticScrollRef.current) {
        const d = getDistanceToBottom(feed);
        if (d <= BOTTOM_STICK_ZONE_PX + SCROLL_EPSILON_PX) {
          pendingProgrammaticScrollRef.current = false;
        }
      }
      stickToBottomRef.current =
        getDistanceToBottom(feed) <= BOTTOM_STICK_ZONE_PX + SCROLL_EPSILON_PX;
      updateScrollButtonVisibility();
    };

    const handleWindowResize = () => {
      if (stickToBottomRef.current) {
        scrollFeedToBottom(feed, 'instant');
      }
      updateScrollButtonVisibility();
    };

    handleFeedScroll();
    feed.addEventListener('scroll', handleFeedScroll, { passive: true });
    feed.addEventListener('scrollend', handleFeedScrollEnd, { passive: true });
    feed.addEventListener('wheel', clearPendingProgrammaticScroll, { passive: true });
    feed.addEventListener('touchstart', clearPendingProgrammaticScroll, { passive: true });
    window.addEventListener('resize', handleWindowResize);

    return () => {
      feed.removeEventListener('scroll', handleFeedScroll);
      feed.removeEventListener('scrollend', handleFeedScrollEnd);
      feed.removeEventListener('wheel', clearPendingProgrammaticScroll);
      feed.removeEventListener('touchstart', clearPendingProgrammaticScroll);
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [updateScrollButtonVisibility]);

  useEffect(() => {
    if (!startAtTop) return;
    const feed = feedRef.current;
    if (!feed) return;

    const frameId = window.requestAnimationFrame(() => {
      feed.scrollTop = 0;
      stickToBottomRef.current = false;
      pendingProgrammaticScrollRef.current = false;
      updateScrollButtonVisibility();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [startAtTop, updateScrollButtonVisibility]);

  useEffect(() => {
    return () => {
      if (onboardingEntryFrameRef.current !== null) {
        window.cancelAnimationFrame(onboardingEntryFrameRef.current);
      }
    };
  }, []);

  const handleStartDialog = () => {
    if (isOnboardingTransitioning || !isOnboardingVisible) {
      return;
    }

    setOnboardingTransitioning(false);
    setOnboardingVisible(false);
  };

  const scriptedUserCount = scriptedTopic
    ? messages.filter((m) => m.role === 'user').length
    : 0;
  const isScriptedInputDisabled =
    scriptedTopic != null &&
    scriptedTopic.questions.length >= 1 &&
    (awaitingScriptedClientReply ||
      scriptedUserCount >= scriptedTopic.questions.length + 1);

  const rootClassName = cn(styles.root, className);
  const isScrollToLatestButtonVisible =
    forceShowScrollToLatestButton ||
    (enableScrollToLatestButton && showScrollToLatestButton);

  const showTrainerIntroBlock = Boolean(trainerIntroText && !isOnboardingVisible);
  const clientTitle = showTrainerIntroBlock ? clientMessageTitle : 'Клиент';

  return (
    <div className={rootClassName} data-testid="dialog-chat">
      <div className={styles.feed} ref={feedRef} role="log" aria-label="История сообщений">
        <div className={styles.feedInner}>
          {isOnboardingVisible ? (
            <div
              className={cn(
                styles.onboardingPanel,
                isOnboardingEntryActive && styles.onboardingPanelEnter,
                isOnboardingTransitioning && styles.onboardingPanelExit
              )}
            >
              <article
                className={cn(
                  styles.inboxMessage,
                  styles.onboardingBubbleBase,
                  isOnboardingEntryActive ? styles.onboardingBubbleEnter : styles.onboardingBubblePreEnter
                )}
                style={
                  {
                    '--onboarding-entry-offset-x': `${onboardingEntryOffset.x}px`,
                    '--onboarding-entry-offset-y': `${onboardingEntryOffset.y}px`,
                  } as React.CSSProperties
                }
                aria-label="Сообщение от ИИ-Тренажёра — приветствие"
                ref={onboardingBubbleRef}
              >
                <div className={cn(styles.inboxMessageCard, styles.trainerFirstInboxCard)}>
                  <div className={styles.inboxHeader}>
                    <img
                      src={trainerAvatarSrc}
                      alt=""
                      className={styles.avatarImage}
                      width={24}
                      height={24}
                    />
                    <span className={styles.inboxTitle}>ИИ-Тренажёр</span>
                  </div>
                  <div className={styles.inboxContent}>
                    <p className={styles.inboxText}>{onboardingWelcomeMessage}</p>
                  </div>
                </div>
              </article>

              <div
                className={cn(
                  styles.onboardingActions,
                  isOnboardingEntryActive && styles.onboardingActionsEnter
                )}
              >
                <Button
                  type="Secondary"
                  className={styles.onboardingStartButton}
                  onClick={handleStartDialog}
                >
                  {onboardingButtonLabel}
                </Button>
              </div>
            </div>
          ) : showTrainerIntroBlock ? (
            <>
              <article
                className={styles.inboxMessage}
                aria-label="Сводка от ИИ-Тренажёра"
              >
                <div className={cn(styles.inboxMessageCard, styles.trainerFirstInboxCard)}>
                  <div className={styles.inboxHeader}>
                    <img
                      src={trainerAvatarSrc}
                      alt=""
                      className={styles.avatarImage}
                      width={24}
                      height={24}
                    />
                    <span className={styles.inboxTitle}>ИИ-Тренажёр</span>
                  </div>
                  <div className={styles.inboxContent}>
                    <p className={styles.inboxText}>{trainerIntroText}</p>
                  </div>
                </div>
              </article>
              <div className={styles.feedDivider} role="separator">
                <div className={styles.feedDividerLine} aria-hidden />
                <p className={styles.feedDividerLabel}>{dialogStartLabel}</p>
                <div className={styles.feedDividerLine} aria-hidden />
              </div>
              <ClientMessageArticle
                ariaLabel="Сообщение от клиента — первое сообщение"
                ref={messages.length === 0 ? latestMessageRef : undefined}
              >
                <div className={cn(styles.inboxMessageCard, styles.clientInboxCard)}>
                  <div className={styles.inboxHeader}>
                    <img src={clientAvatarSrc} alt="" className={styles.avatarImage} width={24} height={24} />
                    <span className={styles.inboxTitle}>{clientTitle}</span>
                  </div>
                  <div className={styles.inboxContent}>
                    <p className={styles.inboxText}>{firstClientMessage}</p>
                  </div>
                </div>
              </ClientMessageArticle>
            </>
          ) : (
            <ClientMessageArticle
              ariaLabel="Сообщение от клиента — первое сообщение"
              ref={messages.length === 0 ? latestMessageRef : undefined}
            >
              <div className={cn(styles.inboxMessageCard, styles.clientInboxCard)}>
                <div className={styles.inboxHeader}>
                  <img src={clientAvatarSrc} alt="" className={styles.avatarImage} width={24} height={24} />
                  <span className={styles.inboxTitle}>{clientTitle}</span>
                </div>
                <div className={styles.inboxContent}>
                  <p className={styles.inboxText}>{firstClientMessage}</p>
                </div>
              </div>
              <div className={styles.inboxSpacer} />
            </ClientMessageArticle>
          )}

          {/* User messages — only appear after user sends */}
          {messages.map((message, idx) =>
            message.role === 'client' ? (
              <ClientMessageArticle
                key={`msg-${idx}`}
                ariaLabel="Сообщение от клиента"
                ref={idx === messages.length - 1 ? latestMessageRef : undefined}
              >
                <div className={cn(styles.inboxMessageCard, styles.clientInboxCard)}>
                  <div className={styles.inboxHeader}>
                    <img src={clientAvatarSrc} alt="" className={styles.avatarImage} width={24} height={24} />
                    <span className={styles.inboxTitle}>{clientTitle}</span>
                  </div>
                  <div className={styles.inboxContent}>
                    <p className={styles.inboxText}>{message.text}</p>
                  </div>
                </div>
              </ClientMessageArticle>
            ) : (
              <article
                key={`msg-${idx}`}
                className={styles.userMessage}
                aria-label="Сообщение пользователя"
                ref={idx === messages.length - 1 ? latestMessageRef : undefined}
              >
                <div className={styles.userMessageContent}>
                  <p className={styles.userMessageText}>{message.text}</p>
                </div>
              </article>
            )
          )}
        </div>
      </div>

      {!isOnboardingVisible && (
        <div className={styles.messageContainer}>
          {isScrollToLatestButtonVisible && (
            <button
              type="button"
              className={styles.scrollToLatestButton}
              onClick={handleScrollToLatest}
              aria-label="Прокрутить к последнему сообщению"
            >
              <ArrowDownIcon />
            </button>
          )}
          <div className={styles.inputWrapper}>
            <InputMessage
              value={inputValue}
              onValueChange={handleValueChange}
              onSend={handleSend}
              placeholder={inputPlaceholder}
              disabled={isScriptedInputDisabled}
              sendDisabled={isScriptedInputDisabled}
              ariaLabel={inputLabel}
            />
          </div>
        </div>
      )}
    </div>
  );
};

function ArrowDownIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M10 4V16M10 16L4 10M10 16L16 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
