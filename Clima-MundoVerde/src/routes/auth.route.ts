// src/routes/auth.route.ts

import { Request, Response, NextFunction, Router } from 'express';
import { login } from '../controllers/auth.controller';

const router = Router();

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(login(req, res))
	.catch(next);
});

export default router;
