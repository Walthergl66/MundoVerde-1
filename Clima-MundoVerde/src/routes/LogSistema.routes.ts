import { Router } from 'express';
import { getLogs } from '../controllers/LogSistema.controller';

const router = Router();

router.get('/', getLogs); // GET /api/logs?ciudad=...&resultado=...&fuente=...

export default router;
