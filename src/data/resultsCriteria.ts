/**
 * Types and mock data for Results page: criteria accordion and recommendations.
 */

export type CriterionStatus = 'success' | 'warning' | 'error';

/** Status labels for accordion cells (matches Figma design) */
export const CRITERION_STATUS_LABELS: Record<CriterionStatus, string> = {
  success: 'Хорошо справляется',
  warning: 'Стоит обратить внимание',
  error: 'Требует доработки',
};

export interface CriterionItem {
  id: string;
  title: string;
  status: CriterionStatus;
  description: string;
}

export interface ResultsRecommendation {
  id: string;
  text: string;
}

/** Default criteria — accordion titles aligned with assessment screen */
export const DEFAULT_CRITERIA: CriterionItem[] = [
  {
    id: 'tochka-language',
    title: 'Язык Точка Банка',
    status: 'success',
    description:
      'Формулировки соответствуют тону и стандартам бренда: уверенно, по делу, без лишней эмоциональности там, где нужна сдержанность.',
  },
  {
    id: 'step-forward',
    title: 'Шаг вперёд',
    status: 'success',
    description:
      'Ты предлагаешь следующий шаг клиенту: уточняешь детали, подводишь к решению и не оставляешь диалог в тупике.',
  },
  {
    id: 'client-language',
    title: 'Общение на языке выгод',
    status: 'success',
    description:
      'Ты связываешь ответы с выгодами для клиента: объясняешь простыми словами, без перегруза терминами, и показываешь ценность решения.',
  },
  {
    id: 'objections',
    title: 'Работа с возражениями',
    status: 'success',
    description:
      'Возражения принимаешь спокойно, уточняешь причину сомнений и отвечаешь по сути, а не уходишь в общие фразы.',
  },
  {
    id: 'responsibility',
    title: 'Ответственность перед клиентом',
    status: 'success',
    description:
      'Берёшь ответственность за ответ: не перекладываешь на клиента и не обещаешь того, чего не можешь выполнить.',
  },
  {
    id: 'right-questions',
    title: 'Проактивный диалог с клиентом',
    status: 'warning',
    description:
      'Иногда можно усилить инициативу: заранее предлагать полезные шаги, уточнять контекст и не оставлять клиента с недосказанностью.',
  },
];

/** Figma 827:137958 — семь уникальных пунктов (восьмой в макете дублировал первый) */
export const DEFAULT_RECOMMENDATIONS: ResultsRecommendation[] = [
  {
    id: 'r1',
    text: 'Внимательно изучай акции и особенности продукта, чтобы полно раскрывать информацию и предлагать клиенту лучшие условия.',
  },
  {
    id: 'r2',
    text: 'Всегда начинай диалог с приветствия и обращения к клиенту по имени — это задаёт дружелюбный тон и соответствует стандартам обслуживания.',
  },
  {
    id: 'r3',
    text: 'Не оставляй вопросы без ответа или с сокращёнными фразами типа «пропустить» — если не знаешь, лучше сообщить, что уточнишь и вернёшься с ответом.',
  },
  {
    id: 'r4',
    text: 'Разбивай тексты на абзацы, используй списки и выделяй ключевые моменты жирным шрифтом для удобства чтения.',
  },
  {
    id: 'r5',
    text: 'При первом упоминании терминов (например, MCC) давай краткое пояснение, чтобы клиенту было понятно.',
  },
  {
    id: 'r6',
    text: 'Используй русские кавычки «» в тексте и следи за пунктуацией.',
  },
  {
    id: 'r7',
    text: 'Добавляй умеренно эмодзи в приветствия и прощания для создания более тёплого и дружелюбного настроя.',
  },
];
