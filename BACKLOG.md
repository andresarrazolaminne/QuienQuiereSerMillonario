# Vitácora / Backlog - Quién Quiere Ser Millonario

Registro de funcionalidades pendientes y mejoras por implementar.

---

## Pendiente

### 1. Personalización de fondo
- [x] Permitir configurar el fondo de las vistas (público, presentador, pantallas de espera)
- [x] Opciones: color sólido, gradiente, imagen de fondo
- [x] Gestión desde el panel de administración (sección Configuración)

### 2. Agregar sonidos
- [ ] Sonido al mostrar pregunta
- [ ] Sonido respuesta correcta
- [ ] Sonido respuesta incorrecta
- [ ] Sonido al activar ayudas (50:50, llamada, público)
- [ ] Sonido de cuenta regresiva o tensión (opcional)
- [ ] Configuración: activar/desactivar sonidos, volumen
- [ ] Gestión de archivos de audio desde Admin

### 3. Evitar seleccionar preguntas ya usadas en la misma ronda
- [x] En la vista del presentador, deshabilitar las preguntas ya usadas en la lista
- [x] No permitir hacer clic en preguntas cuyo índice está en `preguntasUsadas`
- [x] Mantener visualización "usada" y botón deshabilitado

---

## Completado (referencia)

- Backend: Express, Socket.io, CRUD preguntas y pantallas de espera
- Estado del juego compartido en tiempo real
- Vista presentador con controles
- Vista público con pantallas de espera, preguntas y feedback
- Vista de votación del público (real)
- Dashboard admin: pantallas, preguntas, historial
- Ayudas: 50:50, Llamada, Público (por ronda completa)
- Puntaje por pregunta y opción de mostrarlo
- Preguntas usadas marcadas correctamente
- Clave de acceso para el panel admin
- Estilo mejorado de la vista de preguntas
- Vista de votación del público con gráfica en tiempo real

---

## Ideas futuras (opcional)

- Autenticación para presentador
- Múltiples salas/partidas simultáneas
- Modo "seguro" (niveles de preguntas donde no pierdes)
- Exportar historial de rondas
- Temas visuales (claro/oscuro)
