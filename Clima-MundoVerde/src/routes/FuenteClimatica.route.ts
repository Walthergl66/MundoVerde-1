import { Router } from 'express';
import { getAllFuentes } from '../controllers/FuenteClimatica.controller';

const router = Router();

router.get('/', getAllFuentes);

export default router;