import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MainNavBar } from '@components/MainNavBar';
import { Widget } from '@components/Widget';
import { DialogInfoWidget } from '@components/DialogInfoWidget';
import { Cell } from '@components/Cell';
import { DialogChat } from '@components/DialogChat';
import { IncompleteDialogRecoveryModal } from '@components/IncompleteDialogRecoveryModal';
import { dialogTopicsBySkillId } from '@/data/dialogTopics';
import { homeSkills } from '@/data/homeSkills';
import {
  clearDraft,
  hasRecoverableDialogDraft,
  readDraft,
  type DialogDraftState,
} from '@/session/dialogDraftStore';
import { cn } from '@/lib/utils';
import styles from './DialogPage.module.css';

const EMPTY_INITIAL_MESSAGES: Array<{ role: 'client' | 'user'; text: string }> = [];

/** Stroked control: circle + chevron left (Figma Navbar Button 707:20661) */
const BackNavIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path
      d="M13.5 8.5L9.5 12l4 3.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function buildTrainerIntro(rows: Array<{ label: string; value: string }>): string {
  const personal = rows.find((r) => r.label === 'Личные данные')?.value ?? '—';
  const access = rows.find((r) => r.label === 'Тип доступности')?.value ?? '—';
  const biz = rows.find((r) => r.label === 'Бизнес')?.value ?? '—';
  return `Ваш клиент — ${personal}, Тип доступности: ${access}, Бизнес: ${biz}`;
}

const FIRST_CLIENT_MESSAGE_BY_SKILL_ID: Record<string, string> = {
  'doc-order-1': 'Здравствуйте! Подскажите, как заказать выписку по счёту за прошлый месяц?',
  'doc-order-2': 'Добрый день! Нужна справка для налоговой, как её получить?',
  'debit-cards': 'Здравствуйте! Какие условия по дебетовой карте для ИП?',
  'tochka-services': 'Добрый день! Какие у вас есть сервисы для автоматизации бизнеса?',
  'tochka-language': 'Здравствуйте! Объясните, пожалуйста, проще и без сложных терминов.',
  'client-objections': 'Я не уверен, что это мне подойдёт. Почему мне стоит выбрать это решение?',
  empathy: 'Мне сейчас непросто разобраться, помогите, пожалуйста, пошагово.',
  'product-presentation': 'Расскажите кратко, чем этот продукт полезен именно для моего бизнеса.',
  'active-listening': 'Я не до конца понял. Можете уточнить, правильно ли я вас услышал?',
  'ved-1': 'Здравствуйте! Какие документы нужны для валютного перевода за рубеж?',
  'ved-2': 'Добрый день! Как проходит валютный контроль по ВЭД?',
  safety: 'Здравствуйте! Как проверить, что письмо от банка не мошенническое?',
  marketplaces: 'Подскажите, как подключить выплаты с маркетплейсов на счёт?',
  tariffs:
    'Подскажите, могу ли я расширить лимит на вывод поступлений от маркетплейсов? Какой тариф для этого выбрать?',
};

const INITIAL_MESSAGES_BY_SKILL_ID: Record<
  string,
  Array<{ role: 'client' | 'user'; text: string }>
> = {
  'product-presentation': [
    { role: 'user', text: 'У нас небольшая студия дизайна. Что это за продукт в двух словах?' },
    { role: 'client', text: 'Это сервис для продаж и операций: счёт, платежи, документы и аналитика в одном окне.' },
    { role: 'user', text: 'Звучит широко. Какая реальная польза для команды из 7 человек?' },
    { role: 'client', text: 'Меньше ручной рутины: быстрее выставляете счета, контролируете оплаты и не теряете дедлайны по документам.' },
    { role: 'user', text: 'Нам важно быстрее получать оплату от клиентов. Что тут поможет?' },
    { role: 'client', text: 'Готовые шаблоны счетов и быстрые ссылки на оплату: клиенту проще оплатить сразу, а вам проще отследить статус.' },
    { role: 'user', text: 'Ок, а где контроль денег? Сейчас всё в таблицах.' },
    { role: 'client', text: 'В ленте операций и отчётах по категориям видно, откуда пришли деньги и куда уходят, без ручной сверки.' },
    { role: 'user', text: 'Если бухгалтер на удаленке, можно работать вместе?' },
    { role: 'client', text: 'Да, можно разделить роли и доступы, чтобы каждый видел только нужные разделы и действия.' },
    { role: 'user', text: 'А интеграции есть? Нам нужен обмен с CRM.' },
    { role: 'client', text: 'Есть API и типовые сценарии интеграции, чтобы подтянуть сделки и автоматизировать создание документов.' },
    { role: 'user', text: 'Сколько займет старт? Мы не хотим длинное внедрение.' },
    { role: 'client', text: 'Обычно старт занимает от одного дня: базовая настройка, доступы, импорт реквизитов и можно работать.' },
    { role: 'user', text: 'Что с безопасностью и подтверждением операций?' },
    { role: 'client', text: 'Подтверждение важных действий, журнал операций и стандартные банковские меры защиты уже включены.' },
    { role: 'user', text: 'Давайте коротко: почему это выгодно именно нам?' },
    { role: 'client', text: 'Вы экономите время команды, ускоряете оплату, снижаете ошибки в документах и получаете контроль финансов в реальном времени.' },
  ],
};

export function DialogPage() {
  const navigate = useNavigate();
  const { skillId } = useParams<{ skillId: string }>();
  const currentSkill = homeSkills.find((skill) => skill.id === skillId);
  const currentSkillTitle = currentSkill?.title ?? 'Сценарий диалога';
  const scriptedTopic = skillId ? dialogTopicsBySkillId[skillId] : undefined;

  const firstClientMessage =
    scriptedTopic?.questions[0] ??
    (skillId && FIRST_CLIENT_MESSAGE_BY_SKILL_ID[skillId]) ??
    `Здравствуйте! Нужна консультация по теме «${currentSkillTitle}».`;

  const initialMessages = useMemo(() => {
    if (scriptedTopic) {
      return EMPTY_INITIAL_MESSAGES;
    }
    return skillId ? INITIAL_MESSAGES_BY_SKILL_ID[skillId] ?? [] : [];
  }, [skillId, scriptedTopic]);

  const showOnboarding = scriptedTopic ? true : skillId !== 'product-presentation';

  const [isOnboardingPanelVisible, setOnboardingPanelVisible] = useState(showOnboarding);

  const [recoveryChoice, setRecoveryChoice] = useState<'pending' | 'resolved'>(() =>
    skillId && hasRecoverableDialogDraft(skillId) ? 'pending' : 'resolved'
  );
  const [bootstrapDraft, setBootstrapDraft] = useState<DialogDraftState | null>(null);
  const [resumeKey, setResumeKey] = useState(0);

  useEffect(() => {
    setOnboardingPanelVisible(showOnboarding);
  }, [skillId, showOnboarding]);

  useEffect(() => {
    if (!skillId) return;
    const needsPrompt = hasRecoverableDialogDraft(skillId);
    setRecoveryChoice(needsPrompt ? 'pending' : 'resolved');
    setBootstrapDraft(null);
    setResumeKey(0);
  }, [skillId]);

  useEffect(() => {
    if (!skillId || recoveryChoice !== 'resolved') return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!hasRecoverableDialogDraft(skillId)) return;
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [skillId, recoveryChoice]);

  const handleScriptedComplete = useCallback(() => {
    if (skillId) {
      clearDraft(skillId);
      navigate(`/results/${skillId}`, { state: { commitTraining: true } });
    }
  }, [skillId, navigate]);

  const handleRecoveryContinue = useCallback(() => {
    if (!skillId) return;
    const draft = readDraft(skillId);
    if (!draft || draft.status !== 'in_progress') {
      setRecoveryChoice('resolved');
      return;
    }
    setBootstrapDraft(draft);
    setRecoveryChoice('resolved');
    setResumeKey((k) => k + 1);
  }, [skillId]);

  const handleRecoveryStartNew = useCallback(() => {
    if (!skillId) return;
    clearDraft(skillId);
    setBootstrapDraft(null);
    setRecoveryChoice('resolved');
    setResumeKey((k) => k + 1);
  }, [skillId]);

  const handleRecoveryCancel = useCallback(() => {
    navigate('/home');
  }, [navigate]);

  const clientInfoRows = useMemo(
    () => [
      { label: 'Личные данные', value: scriptedTopic?.clientName ?? 'Алина Евгеньевна' },
      { label: 'Тип доступности', value: 'Обычный' },
      { label: 'Бизнес', value: 'ИП' },
    ],
    [scriptedTopic?.clientName]
  );

  const trainerIntroText = useMemo(
    () => (initialMessages.length === 0 ? buildTrainerIntro(clientInfoRows) : undefined),
    [initialMessages.length, clientInfoRows]
  );

  const clientMessageTitle = useMemo(
    () => clientInfoRows.find((r) => r.label === 'Личные данные')?.value ?? 'Клиент',
    [clientInfoRows]
  );

  const handleBack = () => {
    navigate(-1);
  };

  const handleMainNav = useCallback(
    (id: string) => {
      if (id === 'home') {
        navigate('/home');
      }
    },
    [navigate]
  );

  const showRecoveryModal = recoveryChoice === 'pending';

  return (
    <div className={styles.pageShell}>
      <MainNavBar onNavClick={handleMainNav} />
      {showRecoveryModal && (
        <IncompleteDialogRecoveryModal
          onContinue={handleRecoveryContinue}
          onStartNew={handleRecoveryStartNew}
          onCancel={handleRecoveryCancel}
        />
      )}
      <main
        className={cn(styles.root, isOnboardingPanelVisible && styles.rootOnboarding)}
        data-testid="dialog-page"
      >
      <aside className={styles.sidebarColumn} aria-label="Навигация">
        <div className={styles.sidebarHeader}>
          <button
            type="button"
            className={styles.backButton}
            onClick={handleBack}
            aria-label="Назад"
          >
            <BackNavIcon />
          </button>
          <h1 className={styles.sidebarTitle}>Диалог</h1>
        </div>
      </aside>

      <section className={styles.mainColumn} aria-label="Чат с клиентом" aria-hidden={showRecoveryModal}>
        {recoveryChoice === 'resolved' && skillId ? (
          <DialogChat
            key={`${skillId}-${resumeKey}`}
            className={styles.dialogChat}
            firstClientMessage={firstClientMessage}
            initialMessages={initialMessages}
            showOnboarding={showOnboarding}
            onOnboardingVisibilityChange={setOnboardingPanelVisible}
            scriptedTopic={scriptedTopic}
            onScriptedComplete={scriptedTopic ? handleScriptedComplete : undefined}
            trainerIntroText={trainerIntroText}
            clientMessageTitle={clientMessageTitle}
            enableScrollToLatestButton={false}
            bootstrapDraft={bootstrapDraft ?? undefined}
            draftSkillId={skillId}
            persistDraft
          />
        ) : null}
      </section>

      {!isOnboardingPanelVisible && (
        <aside className={styles.widgetColumn} aria-label="Информация о диалоге">
          <DialogInfoWidget
            title={scriptedTopic?.topic ?? currentSkillTitle}
            className={styles.widget}
          />

          <Widget
            title="Информация о клиенте"
            className={cn(styles.widget, styles.clientInfoWidget)}
          >
            {clientInfoRows.map((item, idx) => (
              <Cell
                key={idx}
                size="M"
                variant="default"
                subtitle={item.label}
              >
                {item.value}
              </Cell>
            ))}
          </Widget>
        </aside>
      )}
      </main>
    </div>
  );
}
