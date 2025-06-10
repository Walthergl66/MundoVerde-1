import { Router } from 'express';
import { ConsultaClimaController } from '../controllers/ConsultaClima.controller';

const router = Router();
const controller = new ConsultaClimaController();

const asyncWrapper = (fn: any) => (req: any, res: any, next: any) =>
  Promise.resolve(fn.call(controller, req, res, next)).catch(next);

router.get('/', asyncWrapper(controller.obtenerClimaPorCiudad));

export default router;
