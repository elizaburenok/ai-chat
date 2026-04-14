import React from 'react';
import { Link } from 'react-router-dom';
import { DialogChat } from '@components/DialogChat';
import styles from './DialogScrollTestPage.module.css';

const TEST_FIRST_CLIENT_MESSAGE =
  'Здравствуйте! Я владелец небольшой студии. Покажите коротко, как вы бы презентовали продукт для бизнеса.';

const BASE_TEST_MESSAGES: Array<{ role: 'client' | 'user'; text: string }> = [
  { role: 'user', text: 'Нужен быстрый обзор: что это за продукт и для кого он?' },
  { role: 'client', text: 'Это единый сервис для операционки бизнеса: деньги, документы, платежи и контроль процессов.' },
  { role: 'user', text: 'Чем он полезен именно маленькой команде, где каждый делает все сразу?' },
  { role: 'client', text: 'Снимает рутину: меньше ручных действий, быстрее обмен документами и прозрачнее контроль оплат.' },
  { role: 'user', text: 'У нас часто теряются статусы счетов. Как решается это узкое место?' },
  { role: 'client', text: 'У каждого счета есть понятный статус, а команда видит цепочку от выставления до оплаты.' },
  { role: 'user', text: 'Если клиент оплатил частично, это видно без сверки в таблице?' },
  { role: 'client', text: 'Да, сумма и остаток фиксируются автоматически, а история изменений сохраняется в ленте.' },
  { role: 'user', text: 'Мы работаем в CRM. Придется дублировать данные руками?' },
  { role: 'client', text: 'Нет, можно подключить интеграцию: часть данных подтягивается автоматически в нужные поля.' },
  { role: 'user', text: 'Сколько времени займет запуск, если нужно стартовать на следующей неделе?' },
  { role: 'client', text: 'Базовый запуск обычно укладывается в 1 день: доступы, роли, шаблоны и первичные сценарии.' },
  { role: 'user', text: 'У нас есть руководитель и бухгалтер. Можно развести права по ролям?' },
  { role: 'client', text: 'Да, роли настраиваются гибко: кто-то подтверждает, кто-то просматривает, кто-то создает документы.' },
  { role: 'user', text: 'Хочу понять экономию. Где мы получим самый заметный эффект?' },
  { role: 'client', text: 'Обычно выигрываете на скорости оплаты, снижении ошибок и сокращении ручного контроля.' },
  { role: 'user', text: 'Ок, а если объем операций вырастет в 2-3 раза, система выдержит?' },
  { role: 'client', text: 'Да, сценарии масштабируются: можно добавлять пользователей, роли и автоматизировать новые процессы.' },
  { role: 'user', text: 'Что с безопасностью? Не хочу рисковать платежами и доступами.' },
  { role: 'client', text: 'Критичные действия подтверждаются, ведется журнал операций, доступы ограничены по ролям.' },
  { role: 'user', text: 'Можно ли посмотреть отчеты без долгой настройки?' },
  { role: 'client', text: 'Да, есть готовые отчеты и фильтры, чтобы быстро увидеть движение денег и ключевые показатели.' },
  { role: 'user', text: 'Если сотрудник уходит, его доступ можно закрыть сразу?' },
  { role: 'client', text: 'Да, доступ отключается моментально, а все действия остаются в истории для контроля.' },
  { role: 'user', text: 'Коротко: какой главный аргумент для команды, которая сомневается?' },
  { role: 'client', text: 'Вы тратите меньше времени на операционку и больше - на развитие продукта и продажи.' },
  { role: 'user', text: 'Дай финальную формулировку презентации в одну фразу.' },
  { role: 'client', text: 'Это инструмент, который ускоряет деньги в бизнесе и упрощает ежедневную работу всей команды.' },
];

const TEST_MESSAGES: Array<{ role: 'client' | 'user'; text: string }> = BASE_TEST_MESSAGES.concat(
  BASE_TEST_MESSAGES.slice(0, BASE_TEST_MESSAGES.length / 2)
);

export function DialogScrollTestPage() {
  return (
    <main className={styles.root} data-testid="dialog-scroll-test-page">
      <header className={styles.header}>
        <h1 className={styles.title}>Тест длинного диалога</h1>
        <p className={styles.subtitle}>Сценарий для проверки кнопки "Прокрутить к последнему сообщению"</p>
        <Link className={styles.backLink} to="/home">
          Вернуться на главную
        </Link>
      </header>

      <section className={styles.chatSection} aria-label="Тестовый чат">
        <DialogChat
          className={styles.dialogChat}
          firstClientMessage={TEST_FIRST_CLIENT_MESSAGE}
          initialMessages={TEST_MESSAGES}
          showOnboarding={false}
          startAtTop
          forceShowScrollToLatestButton
        />
      </section>
    </main>
  );
}
