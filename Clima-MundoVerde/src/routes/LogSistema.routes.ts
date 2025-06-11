import { Router } from 'express';
import { getLogs } from '../controllers/LogSistema.controller';

const router = Router();

router.get('/', getLogs); 

export default router;
