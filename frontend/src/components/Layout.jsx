import { useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useConfig } from '../hooks/useConfig';

const navItems = [
  { to: '/publico', label: 'Público', newTab: false },
  { to: '/pantalla', label: 'Pantalla (proyección)', newTab: true },
  { to: '/votacion', label: 'Votación (con menú)', newTab: false },
  { to: '/votar', label: 'Votar (pantalla limpia)', newTab: true },
  { to: '/presentador', label: 'Presentador', newTab: false },
  { to: '/admin', label: 'Admin', newTab: false }
];

const adminSubItems = [
  { to: '/admin/configuracion', label: 'Configuración' },
  { to: '/admin/pantallas', label: 'Pantallas de espera' },
  { to: '/admin/preguntas', label: 'Preguntas' },
  { to: '/admin/historial', label: 'Historial' }
];

const navBtnStyle = (isActive) => ({
  display: 'block',
  width: '100%',
  padding: '0.65rem 1rem',
  borderRadius: 8,
  border: '2px solid',
  borderColor: isActive ? 'var(--gold)' : 'rgba(255,215,0,0.4)',
  background: isActive ? 'linear-gradient(180deg, rgba(255,215,0,0.25) 0%, rgba(255,215,0,0.1) 100%)' : 'linear-gradient(180deg, rgba(45,74,111,0.8) 0%, rgba(26,45,74,0.9) 100%)',
  color: isActive ? 'var(--gold)' : 'var(--white)',
  fontWeight: 600,
  fontSize: '0.95rem',
  textAlign: 'left',
  textDecoration: 'none',
  transition: 'all 0.2s ease',
  boxShadow: isActive ? '0 0 12px rgba(255,215,0,0.3)' : '0 2px 8px rgba(0,0,0,0.3)'
});

export default function Layout() {
  const loc = useLocation();
  const isAdmin = loc.pathname.startsWith('/admin');
  const { config } = useConfig();
  const titulo = config?.titulo_app || 'Millonario';

  useEffect(() => {
    document.title = titulo || 'Quién Quiere Ser Millonario';
  }, [titulo]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <nav style={{
        width: 240,
        background: 'linear-gradient(180deg, #0d1b2a 0%, #1a2d4a 100%)',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        borderRight: '2px solid rgba(255,215,0,0.2)',
        boxShadow: '4px 0 20px rgba(0,0,0,0.3)'
      }}>
        <h2 style={{
          marginBottom: '1rem',
          color: 'var(--gold)',
          fontSize: '1.25rem',
          fontWeight: 800,
          textShadow: '0 0 20px rgba(255,215,0,0.4)'
        }}>
          {titulo}
        </h2>
        {navItems.map(({ to, label, newTab }) => (
          newTab ? (
            <a
              key={to}
              href={to}
              target="_blank"
              rel="noopener noreferrer"
              style={navBtnStyle(false)}
              onMouseOver={e => {
                e.currentTarget.style.borderColor = 'var(--gold)';
                e.currentTarget.style.background = 'linear-gradient(180deg, rgba(255,215,0,0.2) 0%, rgba(255,215,0,0.05) 100%)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.borderColor = 'rgba(255,215,0,0.4)';
                e.currentTarget.style.background = 'linear-gradient(180deg, rgba(45,74,111,0.8) 0%, rgba(26,45,74,0.9) 100%)';
              }}
            >
              {label}
            </a>
          ) : (
            <NavLink
              key={to}
              to={to}
              style={({ isActive }) => navBtnStyle(isActive)}
            >
              {label}
            </NavLink>
          )
        ))}
        {isAdmin && (
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '2px solid rgba(255,215,0,0.2)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--gray)', marginBottom: '0.5rem', fontWeight: 600 }}>ADMIN</div>
            {adminSubItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                style={({ isActive }) => ({
                  ...navBtnStyle(isActive),
                  padding: '0.5rem 1rem',
                  fontSize: '0.9rem'
                })}
              >
                {label}
              </NavLink>
            ))}
          </div>
        )}
      </nav>
      <main style={{ flex: 1, overflow: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
}
