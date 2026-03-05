import { Outlet } from 'react-router-dom';
import { setAdminAuthenticated } from '../../components/AdminAuth';

export default function AdminDashboard() {
  return (
    <div style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h1 style={{ margin: 0, color: 'var(--gold)' }}>Panel de Administración</h1>
        <button
          onClick={() => { setAdminAuthenticated(false); window.location.href = '/admin'; }}
          style={{ background: 'var(--gray)', color: 'var(--white)', fontSize: '0.9rem' }}
        >
          Cerrar sesión
        </button>
      </div>
      <Outlet />
    </div>
  );
}
