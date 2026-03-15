/**
 * Mock skills data for Home page.
 * Skills are grouped by theme and sorted by priority then alphabetically.
 * Matches Figma design: themes and status labels.
 */

export type SkillPriority = 'not_evaluated' | 'attention' | 'good';

/** Sort order for skills in groups: good first, then attention, then not_evaluated */
export const SKILL_PRIORITY_ORDER: SkillPriority[] = [
  'not_evaluated',
  'attention',
  'good',
];

export const SKILL_PRIORITY_LABELS: Record<SkillPriority, string> = {
  not_evaluated: 'Пока не оценивалось',
  attention: 'Стоит обратить внимание',
  good: 'Хорошо справляется',
};

export interface SkillTheme {
  id: string;
  label: string;
}

/** Theme filters - first is "Все компетенции", rest are theme chips */
export const SKILL_THEMES: SkillTheme[] = [
  { id: 'all', label: 'Все компетенции' },
  { id: 'knowledge', label: 'Знания' },
  { id: 'client-attitude', label: 'Отношение к клиенту' },
  { id: 'self-dependent', label: 'Всё зависит от тебя' },
  { id: 'care-for-each-other', label: 'Бережём друг друга' },
];

/** Theme IDs for filtering (excludes 'all') */
export const THEME_IDS = SKILL_THEMES.filter((t) => t.id !== 'all').map(
  (t) => t.id
);

export interface SkillItem {
  id: string;
  title: string;
  themeId: string;
  priority: SkillPriority;
  iconBgColor?: string;
}

export const homeSkills: SkillItem[] = [
  { id: 'ved-1', title: 'ВЭД', themeId: 'knowledge', priority: 'not_evaluated', iconBgColor: 'var(--color-bg-neutral-2)' },
  { id: 'debit-cards', title: 'Дебетовые карты', themeId: 'knowledge', priority: 'not_evaluated', iconBgColor: 'var(--color-bg-neutral-2)' },
  { id: 'tochka-services', title: 'Знание остальных сервисов Точки', themeId: 'knowledge', priority: 'not_evaluated', iconBgColor: 'var(--color-bg-neutral-2)' },
  { id: 'tochka-language', title: 'Язык Точки', themeId: 'knowledge', priority: 'not_evaluated', iconBgColor: 'var(--color-bg-neutral-2)' },
  { id: 'ved-2', title: 'ВЭД', themeId: 'knowledge', priority: 'not_evaluated', iconBgColor: 'var(--color-bg-neutral-2)' },
  { id: 'safety', title: 'Безопасность', themeId: 'care-for-each-other', priority: 'not_evaluated', iconBgColor: 'var(--color-bg-neutral-2)' },
  { id: 'marketplaces', title: 'Маркетплейсы', themeId: 'care-for-each-other', priority: 'not_evaluated', iconBgColor: 'var(--color-bg-neutral-2)' },
  { id: 'doc-order-1', title: 'Заказ документов', themeId: 'care-for-each-other', priority: 'not_evaluated', iconBgColor: 'var(--color-bg-neutral-2)' },
  { id: 'doc-order-2', title: 'Заказ документов', themeId: 'care-for-each-other', priority: 'not_evaluated', iconBgColor: 'var(--color-bg-neutral-2)' },
  { id: 'client-objections', title: 'Работа с возражениями', themeId: 'client-attitude', priority: 'not_evaluated', iconBgColor: 'var(--color-bg-neutral-2)' },
  { id: 'empathy', title: 'Эмпатия', themeId: 'client-attitude', priority: 'not_evaluated', iconBgColor: 'var(--color-bg-neutral-2)' },
  { id: 'product-presentation', title: 'Презентация продукта', themeId: 'self-dependent', priority: 'not_evaluated', iconBgColor: 'var(--color-bg-neutral-2)' },
  { id: 'active-listening', title: 'Активное слушание', themeId: 'self-dependent', priority: 'not_evaluated', iconBgColor: 'var(--color-bg-neutral-2)' },
];
