import React, { useEffect, useRef } from 'react';
import { Button } from '@components/Button';
import { InputMessage } from '@components/InputMessage';
import { cn } from '@/lib/utils';
import styles from './DialogChat.module.css';

export interface DialogChatProps {
  /** Initial chat messages rendered after the first client message */
  initialMessages?: Array<{ role: 'client' | 'user'; text: string }>;
  /** Show onboarding panel before dialog starts */
  showOnboarding?: boolean;
  /** Onboarding welcome text shown before dialog start */
  onboardingWelcomeMessage?: string;
  /** Onboarding button title */
  onboardingButtonLabel?: string;
  /** First message from client after onboarding */
  firstClientMessage?: string;
  /** Placeholder for input */
  inputPlaceholder?: string;
  /** Input label */
  inputLabel?: string;
  /** Additional class name */
  className?: string;
  /** Start chat feed from top on first render */
  startAtTop?: boolean;
  /** Always show scroll-to-latest button (for testing) */
  forceShowScrollToLatestButton?: boolean;
}

const SCROLL_BOTTOM_THRESHOLD_PX = 24;
const DEFAULT_ONBOARDING_WELCOME =
  'Привет! Я — тренажёр, симулятор общения с реальным клиентом на основе искусственного интеллекта. С моей помощью сможешь практиковать навыки общения и отточить свои умения. Благодаря нашим тренировкам ты станешь увереннее и эффективнее в взаимодействии с клиентами. Удачи, у тебя все получится!';
const DEFAULT_ONBOARDING_BUTTON_LABEL = 'Поехали';
const DEFAULT_FIRST_CLIENT_MESSAGE = 'Здравствуйте! Мне нужно заказать документы.';

export const DialogChat: React.FC<DialogChatProps> = (props) => {
  const {
    initialMessages = [],
    showOnboarding = true,
    onboardingWelcomeMessage = DEFAULT_ONBOARDING_WELCOME,
    onboardingButtonLabel = DEFAULT_ONBOARDING_BUTTON_LABEL,
    firstClientMessage = DEFAULT_FIRST_CLIENT_MESSAGE,
    inputPlaceholder = 'Отправить новое сообщение',
    inputLabel = 'Ввод ответа',
    className,
    startAtTop = false,
    forceShowScrollToLatestButton = false,
  } = props;

  const [inputValue, setInputValue] = React.useState('');
  const [messages, setMessages] = React.useState<Array<{ role: 'client' | 'user'; text: string }>>(
    initialMessages
  );
  const [isOnboardingVisible, setOnboardingVisible] = React.useState(showOnboarding);
  const [isOnboardingEntryActive, setOnboardingEntryActive] = React.useState(false);
  const [onboardingEntryOffset, setOnboardingEntryOffset] = React.useState({ x: 0, y: 0 });
  const [isOnboardingTransitioning, setOnboardingTransitioning] = React.useState(false);
  const [showScrollToLatestButton, setShowScrollToLatestButton] = React.useState(false);
  const feedRef = useRef<HTMLDivElement>(null);
  const latestMessageRef = useRef<HTMLElement | null>(null);
  const onboardingBubbleRef = useRef<HTMLElement | null>(null);
  const onboardingEntryFrameRef = useRef<number | null>(null);

  const handleValueChange = (value: string) => {
    setInputValue(value);
  };

  const handleSend = (value: string) => {
    const plainText = value.replace(/<[^>]+>/g, '').trim();
    if (!plainText) return;
    setMessages((prev) => [...prev, { role: 'user', text: plainText }]);
    setInputValue('');
  };

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    setOnboardingVisible(showOnboarding);
  }, [showOnboarding]);

  const updateScrollButtonVisibility = React.useCallback(() => {
    const feed = feedRef.current;

    if (!feed || isOnboardingVisible || isOnboardingTransitioning) {
      setShowScrollToLatestButton(false);
      return;
    }

    const isOverflowed = feed.scrollHeight > feed.clientHeight + 1;
    const distanceToBottom = feed.scrollHeight - feed.clientHeight - feed.scrollTop;
    setShowScrollToLatestButton(isOverflowed && distanceToBottom > SCROLL_BOTTOM_THRESHOLD_PX);
  }, [isOnboardingVisible, isOnboardingTransitioning]);

  const handleScrollToLatest = React.useCallback(() => {
    const feed = feedRef.current;
    if (!feed) return;
    const latestMessageEl = latestMessageRef.current;
    if (latestMessageEl) {
      latestMessageEl.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    } else {
      feed.scrollTo({
        top: feed.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    const feed = feedRef.current;
    if (!feed) return;
    feed.scrollTop = feed.scrollHeight;
    updateScrollButtonVisibility();
  }, [messages, isOnboardingVisible, isOnboardingTransitioning, updateScrollButtonVisibility]);

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

    const handleFeedScroll = () => {
      updateScrollButtonVisibility();
    };

    handleFeedScroll();
    feed.addEventListener('scroll', handleFeedScroll, { passive: true });
    window.addEventListener('resize', handleFeedScroll);

    return () => {
      feed.removeEventListener('scroll', handleFeedScroll);
      window.removeEventListener('resize', handleFeedScroll);
    };
  }, [updateScrollButtonVisibility]);

  useEffect(() => {
    if (!startAtTop) return;
    const feed = feedRef.current;
    if (!feed) return;

    const frameId = window.requestAnimationFrame(() => {
      feed.scrollTop = 0;
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

  const rootClassName = cn(styles.root, className);
  const isScrollToLatestButtonVisible = forceShowScrollToLatestButton || showScrollToLatestButton;

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
                <div className={styles.inboxHeader}>
                  <div className={styles.avatar} aria-hidden />
                  <span className={styles.inboxTitle}>ИИ-Тренажёр</span>
                </div>
                <div className={styles.inboxContent}>
                  <p className={styles.inboxText}>{onboardingWelcomeMessage}</p>
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
          ) : (
            <article
              className={cn(styles.inboxMessage, styles.firstClientMessage)}
              aria-label="Сообщение от клиента — первое сообщение"
              ref={messages.length === 0 ? latestMessageRef : undefined}
            >
              <div className={styles.inboxHeader}>
                <div className={styles.avatar} aria-hidden />
                <span className={styles.inboxTitle}>Клиент</span>
              </div>
              <div className={styles.inboxContent}>
                <p className={styles.inboxText}>{firstClientMessage}</p>
              </div>
              <div className={styles.inboxSpacer} />
            </article>
          )}

          {/* User messages — only appear after user sends */}
          {messages.map((message, idx) =>
            message.role === 'client' ? (
              <article
                key={`msg-${idx}`}
                className={styles.inboxMessage}
                aria-label="Сообщение от клиента"
                ref={idx === messages.length - 1 ? latestMessageRef : undefined}
              >
                <div className={styles.inboxHeader}>
                  <div className={styles.avatar} aria-hidden />
                  <span className={styles.inboxTitle}>Клиент</span>
                </div>
                <div className={styles.inboxContent}>
                  <p className={styles.inboxText}>{message.text}</p>
                </div>
              </article>
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
            <p className={styles.inputLabel} id="dialog-input-label">
              {inputLabel}
            </p>
            <InputMessage
              value={inputValue}
              onValueChange={handleValueChange}
              onSend={handleSend}
              placeholder={inputPlaceholder}
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
