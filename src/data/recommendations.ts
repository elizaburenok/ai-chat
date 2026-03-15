/**
 * Recommended skills for the home page block.
 * Maps to existing skills from homeSkills.
 */

export interface RecommendationItem {
  skillId: string;
  title: string;
  label?: string;
  icon: 'two-hands' | 'typewriter' | 'track';
}

export const RECOMMENDATIONS: RecommendationItem[] = [
  { skillId: 'empathy', title: 'Эмоциональный контакт', label: 'Пока не оценивалось', icon: 'two-hands' },
  { skillId: 'tochka-language', title: 'Язык Точки', icon: 'typewriter' },
  { skillId: 'product-presentation', title: 'Шаг вперёд', icon: 'track' },
];
