import { AppRoutes } from '@/routes';
import { TrainingSessionProvider } from '@/session';
import styles from './App.module.css';

export function App() {
  return (
    <div className={styles.root}>
      <TrainingSessionProvider>
        <AppRoutes />
      </TrainingSessionProvider>
    </div>
  );
}
