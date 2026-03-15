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

/** Default mock criteria for accordion */
export const DEFAULT_CRITERIA: CriterionItem[] = [
  {
    id: 'knowledge',
    title: 'Знание продукта',
    status: 'success',
    description:
      'Ты хорошо ориентируешься в продукте и можешь давать развёрнутые ответы. Продолжай в том же духе — клиенты ценят экспертизу и уверенные объяснения.',
  },
  {
    id: 'greeting',
    title: 'Приветствие и обращение по имени',
    status: 'warning',
    description:
      'Важно всегда приветствовать клиента и обращаться по имени. Это создаёт личный контакт и повышает доверие. Добавь приветствие в начало диалога и используй имя из контекста.',
  },
  {
    id: 'structure',
    title: 'Структурирование ответов',
    status: 'warning',
    description:
      'Избегай плотных блоков текста. Разбивай ответы на абзацы, используй списки и русские кавычки «» вместо "". Структурированная информация легче воспринимается.',
  },
  {
    id: 'completeness',
    title: 'Полнота информации',
    status: 'warning',
    description:
      'Убедись, что отвечаешь на все части вопроса и не пропускаешь важные детали. Перед отправкой проверь, что клиент получит полный ответ на свой запрос.',
  },
];

/** Default mock recommendations for improvement tips */
export const DEFAULT_RECOMMENDATIONS: ResultsRecommendation[] = [
  { id: 'r1', text: 'Потренируй навык «Приветствие» — добавь короткий модуль в начало диалога.' },
  { id: 'r2', text: 'Используй списки и абзацы при длинных ответах.' },
  { id: 'r3', text: 'Обращайся к клиенту по имени в середине разговора.' },
];
