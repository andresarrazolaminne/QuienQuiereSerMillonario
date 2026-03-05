import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authApi } from '../services/api';

const STORAGE_KEY = 'millonario_admin_auth';

export function isAdminAuthenticated() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export function setAdminAuthenticated(valid) {
  try {
    if (valid) {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  } catch (_) {}
}

export default function AdminAuth({ children }) {
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (isAdminAuthenticated()) {
    return children;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authApi.verify(clave);
      if (res?.valid) {
        setAdminAuthenticated(true);
        navigate(location.pathname, { replace: true });
      } else {
        setError('Clave incorrecta');
      }
    } catch (err) {
      setError('Error al verificar. Comprueba la conexión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(180deg, #0a1628 0%, #1a2d4a 100%)',
      padding: '2rem'
    }}>
      <div style={{
        background: 'var(--blue-mid)',
        padding: '2rem',
        borderRadius: 12,
        border: '2px solid var(--gold)',
        maxWidth: 360,
        width: '100%'
      }}>
        <h1 style={{ marginBottom: '0.5rem', color: 'var(--gold)', textAlign: 'center' }}>
          Panel de Administración
        </h1>
        <p style={{ marginBottom: '1.5rem', color: 'var(--gray)', textAlign: 'center', fontSize: '0.9rem' }}>
          Introduce la clave para acceder
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={clave}
            onChange={(e) => { setClave(e.target.value); setError(''); }}
            placeholder="Clave de acceso"
            autoFocus
            disabled={loading}
            style={{
              width: '100%',
              marginBottom: '0.75rem',
              padding: '0.75rem 1rem',
              fontSize: '1rem'
            }}
          />
          {error && (
            <div style={{ color: 'var(--red)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading || !clave.trim()}
            style={{
              width: '100%',
              background: 'var(--gold)',
              color: 'var(--blue-dark)',
              padding: '0.75rem',
              fontWeight: 600,
              fontSize: '1rem'
            }}
          >
            {loading ? 'Verificando...' : 'Acceder'}
          </button>
        </form>
      </div>
    </div>
  );
}
