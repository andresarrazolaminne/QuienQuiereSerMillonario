import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AdminAuth from './components/AdminAuth';
import AudienceView from './views/Audience/AudienceView';
import VotacionView from './views/Votacion/VotacionView';
import PresenterView from './views/Presenter/PresenterView';
import AdminDashboard from './views/Admin/AdminDashboard';
import AdminWaitingScreens from './views/Admin/AdminWaitingScreens';
import AdminQuestions from './views/Admin/AdminQuestions';
import AdminHistory from './views/Admin/AdminHistory';
import AdminConfig from './views/Admin/AdminConfig';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/publico" replace />} />
        <Route path="publico" element={<AudienceView />} />
        <Route path="votacion" element={<VotacionView />} />
        <Route path="presentador" element={<PresenterView />} />
        <Route path="admin" element={<AdminAuth><AdminDashboard /></AdminAuth>}>
          <Route index element={<Navigate to="configuracion" replace />} />
          <Route path="pantallas" element={<AdminWaitingScreens />} />
          <Route path="preguntas" element={<AdminQuestions />} />
          <Route path="historial" element={<AdminHistory />} />
          <Route path="configuracion" element={<AdminConfig />} />
        </Route>
      </Route>
      <Route path="/pantalla" element={<AudienceView fullscreen />} />
      <Route path="/votar" element={<VotacionView />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
