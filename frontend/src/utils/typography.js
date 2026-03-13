export const TIPOGRAFIA_DEFAULTS = {
  fontFamily: 'Segoe UI, system-ui, sans-serif',
  colorPregunta: '#ffffff',
  colorRespuesta: '#ffffff',
  colorTitulo: '#ffd700',
  colorPuntaje: '#ffd700',
  colorCorrecto: '#22c55e',
  colorIncorrecto: '#ef4444',
  fontSizePregunta: 1.25,
  fontSizeRespuesta: 1,
  fontSizeTitulo: 1.1,
  fontSizePuntaje: 1.5
};

export function getTypography(config) {
  const t = config?.tipografia || {};
  return {
    fontFamily: t.fontFamily ?? TIPOGRAFIA_DEFAULTS.fontFamily,
    colorPregunta: t.colorPregunta ?? TIPOGRAFIA_DEFAULTS.colorPregunta,
    colorRespuesta: t.colorRespuesta ?? TIPOGRAFIA_DEFAULTS.colorRespuesta,
    colorTitulo: t.colorTitulo ?? TIPOGRAFIA_DEFAULTS.colorTitulo,
    colorPuntaje: t.colorPuntaje ?? TIPOGRAFIA_DEFAULTS.colorPuntaje,
    colorCorrecto: t.colorCorrecto ?? TIPOGRAFIA_DEFAULTS.colorCorrecto,
    colorIncorrecto: t.colorIncorrecto ?? TIPOGRAFIA_DEFAULTS.colorIncorrecto,
    fontSizePregunta: t.fontSizePregunta ?? TIPOGRAFIA_DEFAULTS.fontSizePregunta,
    fontSizeRespuesta: t.fontSizeRespuesta ?? TIPOGRAFIA_DEFAULTS.fontSizeRespuesta,
    fontSizeTitulo: t.fontSizeTitulo ?? TIPOGRAFIA_DEFAULTS.fontSizeTitulo,
    fontSizePuntaje: t.fontSizePuntaje ?? TIPOGRAFIA_DEFAULTS.fontSizePuntaje
  };
}
