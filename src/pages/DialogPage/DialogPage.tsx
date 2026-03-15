import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Widget } from '@components/Widget';
import { DialogInfoWidget } from '@components/DialogInfoWidget';
import { Cell } from '@components/Cell';
import { PageAction } from '@components/PageAction';
import { DialogChat } from '@components/DialogChat';
import { homeSkills } from '@/data/homeSkills';
import { cn } from '@/lib/utils';
import styles from './DialogPage.module.css';

/** Chevron-left icon for back button */
const ChevronLeftIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path
      d="M15 18l-6-6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Arrow-right outgoing icon for finish dialog */
const ArrowRightOutgoingIcon: React.FC = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path
      d="M7 17L17 7M17 7H7M17 7V17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Mock client info for layout */
const MOCK_CLIENT_INFO = [
  { label: 'Личные данные', value: 'Алина Евгеньевна' },
  { label: 'Тип доступности', value: 'Обычный' },
  { label: 'Бизнес', value: 'ИП' },
];

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
  const [timerSeconds, setTimerSeconds] = useState(61);
  const currentSkill = homeSkills.find((skill) => skill.id === skillId);
  const currentSkillTitle = currentSkill?.title ?? 'Сценарий диалога';
  const firstClientMessage =
    (skillId && FIRST_CLIENT_MESSAGE_BY_SKILL_ID[skillId]) ||
    `Здравствуйте! Нужна консультация по теме «${currentSkillTitle}».`;
  const initialMessages = useMemo(
    () => (skillId ? INITIAL_MESSAGES_BY_SKILL_ID[skillId] ?? [] : []),
    [skillId]
  );
  const showOnboarding = skillId !== 'product-presentation';

  const handleBack = () => {
    navigate(-1);
  };

  const handleFinish = () => {
    if (skillId) {
      navigate(`/results/${skillId}`);
    } else {
      navigate('/');
    }
  };

  const timerDisplay = `${String(Math.floor(timerSeconds / 60)).padStart(2, '0')}:${String(timerSeconds % 60).padStart(2, '0')}`;

  return (
    <main className={styles.root} data-testid="dialog-page">
      <aside className={styles.sidebarColumn} aria-label="Навигация">
        <div className={styles.sidebarHeader}>
          <button
            type="button"
            className={styles.backButton}
            onClick={handleBack}
            aria-label="Назад"
          >
            <ChevronLeftIcon />
          </button>
          <h1 className={styles.sidebarTitle}>Диалог</h1>
        </div>
      </aside>

      <section className={styles.mainColumn} aria-label="Чат с клиентом">
        <DialogChat
          className={styles.dialogChat}
          firstClientMessage={firstClientMessage}
          initialMessages={initialMessages}
          showOnboarding={showOnboarding}
        />
      </section>

      <aside className={styles.widgetColumn} aria-label="Информация о диалоге">
        <DialogInfoWidget title={currentSkillTitle} timerDisplay={timerDisplay} className={styles.widget} />

        <Widget title="Информация о клиенте" className={cn(styles.widget, styles.clientInfoWidget)}>
          {MOCK_CLIENT_INFO.map((item, idx) => (
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

        <div className={styles.finishSection}>
          <PageAction
            title="Завершить диалог"
            iconLeft={<ArrowRightOutgoingIcon />}
            onClick={handleFinish}
          />
        </div>
      </aside>
    </main>
  );
}
