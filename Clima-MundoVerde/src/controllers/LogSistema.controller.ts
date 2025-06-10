import { Request, Response, Router } from "express";
import { LogSistemaService } from "../servicies/LogSistema.service";

const router = Router();
const logService = new LogSistemaService();

router.get("/", async (req: Request, res: Response) => {
  const logs = await logService.getAll({
    ciudad: req.query.ciudad as string,
    resultadoConsulta: req.query.resultado as string,
    fuenteNombre: req.query.fuente as string,
  });

  res.json(logs);
});

export default router;
