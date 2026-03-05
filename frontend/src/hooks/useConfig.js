import { useEffect, useState } from 'react';
import { configApi } from '../services/api';

export function useConfig() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    configApi.get().then(setConfig).catch(() => setConfig({}));
  }, []);

  const updateConfig = async (data) => {
    const updated = await configApi.update(data);
    setConfig(updated);
    return updated;
  };

  return { config, updateConfig };
}
