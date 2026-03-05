export function getBackgroundStyle(config) {
  if (!config || !config.tipo) return 'linear-gradient(180deg, #0a1628 0%, #1a2d4a 100%)';
  switch (config.tipo) {
    case 'color':
      return config.color || config.valor || '#0a1628';
    case 'gradiente':
      return `linear-gradient(${config.angulo ?? 180}deg, ${config.color1 ?? '#0a1628'} 0%, ${config.color2 ?? '#1a2d4a'} 100%)`;
    case 'imagen':
      return config.url ? `#0a1628 url(${config.url}) center/cover no-repeat` : 'linear-gradient(180deg, #0a1628 0%, #1a2d4a 100%)';
    default:
      return 'linear-gradient(180deg, #0a1628 0%, #1a2d4a 100%)';
  }
}
