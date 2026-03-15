import { AppRoutes } from '@/routes';
import styles from './App.module.css';

export function App() {
  return (
    <div className={styles.root}>
      <AppRoutes />
    </div>
  );
}
