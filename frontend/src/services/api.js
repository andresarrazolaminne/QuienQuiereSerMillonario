const BASE = '/api';

export const authApi = {
  verify: (clave) => fetchApi('/auth/verify', { method: 'POST', body: JSON.stringify({ clave }) })
};

export const configApi = {
  get: () => fetchApi('/config'),
  update: (data) => fetchApi('/config', { method: 'PUT', body: JSON.stringify(data) }),
  uploadBackground: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return fetch(BASE + '/config/upload-background', { method: 'POST', body: formData })
      .then(r => r.ok ? r.json() : r.json().then(d => { throw new Error(d.error || 'Error al subir'); }));
  }
};

async function fetchApi(path, options = {}) {
  const res = await fetch(BASE + path, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers }
  });
  if (res.status === 204) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || res.statusText);
  return data;
}

export const preguntasApi = {
  getAll: () => fetchApi('/preguntas'),
  getById: (id) => fetchApi(`/preguntas/${id}`),
  create: (data) => fetchApi('/preguntas', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => fetchApi(`/preguntas/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => fetchApi(`/preguntas/${id}`, { method: 'DELETE' }),
  importCsv: (rows) => fetchApi('/preguntas/import-csv', { method: 'POST', body: JSON.stringify({ rows }) })
};

export const pantallasApi = {
  getAll: () => fetchApi('/pantallas-espera'),
  getById: (id) => fetchApi(`/pantallas-espera/${id}`),
  create: (formData) => fetch(BASE + '/pantallas-espera', { method: 'POST', body: formData }).then(r => r.ok ? r.json() : r.json().then(d => { throw new Error(d.error); })),
  update: (id, formData) => fetch(BASE + `/pantallas-espera/${id}`, { method: 'PUT', body: formData }).then(r => r.ok ? r.json() : r.json().then(d => { throw new Error(d.error); })),
  delete: (id) => fetchApi(`/pantallas-espera/${id}`, { method: 'DELETE' })
};

export const rondasApi = {
  getAll: () => fetchApi('/rondas'),
  getById: (id) => fetchApi(`/rondas/${id}`),
  create: (data) => fetchApi('/rondas', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => fetchApi(`/rondas/${id}`, { method: 'PUT', body: JSON.stringify(data) })
};
