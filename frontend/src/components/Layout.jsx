import { Outlet, NavLink, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/publico', label: 'Público' },
  { to: '/pantalla', label: 'Pantalla (proyección)' },
  { to: '/votacion', label: 'Votación (con menú)' },
  { to: '/votar', label: 'Votar (pantalla limpia)' },
  { to: '/presentador', label: 'Presentador' },
  { to: '/admin', label: 'Admin' }
];

const adminSubItems = [
  { to: '/admin/configuracion', label: 'Configuración' },
  { to: '/admin/pantallas', label: 'Pantallas de espera' },
  { to: '/admin/preguntas', label: 'Preguntas' },
  { to: '/admin/historial', label: 'Historial' }
];

export default function Layout() {
  const loc = useLocation();
  const isAdmin = loc.pathname.startsWith('/admin');

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <nav style={{
        width: 220,
        background: 'var(--blue-mid)',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        borderRight: '1px solid var(--blue-light)'
      }}>
        <h2 style={{ marginBottom: '0.5rem', color: 'var(--gold)' }}>Millonario</h2>
        {navItems.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => ({
              padding: '0.5rem 0.75rem',
              borderRadius: 6,
              color: isActive ? 'var(--gold)' : 'var(--white)',
              background: isActive ? 'rgba(255,215,0,0.15)' : 'transparent'
            })}
          >
            {label}
          </NavLink>
        ))}
        {isAdmin && (
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--blue-light)' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--gray)', marginBottom: '0.5rem' }}>Admin</div>
            {adminSubItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                style={({ isActive }) => ({
                  display: 'block',
                  padding: '0.4rem 0.75rem',
                  borderRadius: 6,
                  fontSize: '0.9rem',
                  color: isActive ? 'var(--gold)' : 'var(--white)',
                  background: isActive ? 'rgba(255,215,0,0.15)' : 'transparent'
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
