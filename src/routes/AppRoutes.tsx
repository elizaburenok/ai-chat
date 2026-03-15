import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { DialogPage } from '@/pages/DialogPage';
import { ResultsPage } from '@/pages/ResultsPage';
import { DialogScrollTestPage } from '@/pages/DialogScrollTestPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage passedDialogs={[]} />} />
      <Route path="/dialog/:skillId" element={<DialogPage />} />
      <Route path="/dialog-scroll-test" element={<DialogScrollTestPage />} />
      <Route path="/results/:skillId" element={<ResultsPage />} />
      <Route path="/history" element={<div>История (в разработке)</div>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
