import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainNavBar } from '@components/MainNavBar';
import { ServiceCard } from '@components/ServiceCard';
import iconSkills from '@avatar-icons/services/Services/Skills.svg';
import iconMyTeam from '@avatar-icons/services/Services/My Team.svg';
import iconPassSkill from '@avatar-icons/services/Services/Pass Skill.svg';
import iconSendFeedback from '@avatar-icons/services/Services/Send Feedback.svg';
import iconAiTraini from '@avatar-icons/services/Services/AI Traini.svg';
import iconMyActivity from '@avatar-icons/services/Services/My activity.svg';
import iconEfficiency from '@avatar-icons/services/Services/Efficiency.svg';
import styles from './MainServicesPage.module.css';

/** Order and copy from Figma 132:7507; figmaLayer matches avatar node data-name */
const SECTION_MY_ACTIVITY = {
  title: 'Моя деятельность',
  cards: [
    {
      figmaLayer: 'Services/Skills',
      icon: iconSkills,
      title: 'Скиллы',
      description: 'Проверка скиллов',
    },
    {
      figmaLayer: 'Services/My Team',
      icon: iconMyTeam,
      title: 'Моя команда',
      description: 'Участники комады',
    },
  ],
} as const;

const SECTION_EFFICIENCY = {
  title: 'Эффективность',
  cards: [
    {
      figmaLayer: 'Services/Pass Skill',
      icon: iconPassSkill,
      title: 'Сдать скилл',
      description: 'Оставить заявку на сдачу',
    },
    {
      figmaLayer: 'Services/Send Feedback',
      icon: iconSendFeedback,
      title: 'Обратная связь',
      description: 'Посмотреть и оставить обратную связь',
    },
    {
      figmaLayer: 'Services/ AI Traini',
      icon: iconAiTraini,
      title: 'Тренажёр',
      description: 'Проходите диалоги',
      navigateToHome: true as const,
    },
    {
      figmaLayer: 'Services/My activity',
      icon: iconMyActivity,
      title: 'Мой грейд',
      description: 'Посмотреть грейд и точки роста',
    },
    {
      figmaLayer: 'Services/Efficiency',
      icon: iconEfficiency,
      title: 'Моя эффективность',
      description: 'Посмотреть эффективность работы',
    },
  ],
} as const;

export function MainServicesPage() {
  const navigate = useNavigate();

  const handleMainNav = useCallback(
    (id: string) => {
      if (id === 'home') {
        navigate('/home');
      }
    },
    [navigate]
  );

  return (
    <div className={styles.root} data-testid="main-services-page">
      <MainNavBar activeNavId="services" onNavClick={handleMainNav} />

      <div className={styles.content}>
        <section className={styles.section} aria-labelledby="main-services-my-activity-heading">
          <header className={styles.sectionHeader}>
            <h1 id="main-services-my-activity-heading" className={styles.sectionTitle}>
              {SECTION_MY_ACTIVITY.title}
            </h1>
          </header>
          <div className={styles.cards}>
            {SECTION_MY_ACTIVITY.cards.map((card) => (
              <ServiceCard
                key={card.figmaLayer}
                figmaLayerName={card.figmaLayer}
                iconSrc={card.icon}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="main-services-efficiency-heading">
          <header className={styles.sectionHeader}>
            <h2 id="main-services-efficiency-heading" className={styles.sectionTitle}>
              {SECTION_EFFICIENCY.title}
            </h2>
          </header>
          <div className={styles.cards}>
            {SECTION_EFFICIENCY.cards.map((card) => (
              <ServiceCard
                key={card.figmaLayer}
                figmaLayerName={card.figmaLayer}
                iconSrc={card.icon}
                title={card.title}
                description={card.description}
                onClick={
                  'navigateToHome' in card && card.navigateToHome ? () => navigate('/home') : undefined
                }
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
