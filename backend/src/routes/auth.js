import { Router } from 'express';

const ADMIN_KEY = process.env.ADMIN_KEY || 'admin123';

const router = Router();

router.post('/verify', (req, res) => {
  const { clave } = req.body;
  const valid = clave && String(clave) === ADMIN_KEY;
  res.json({ valid: !!valid });
});

export default router;
