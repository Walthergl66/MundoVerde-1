import { Request, Response } from 'express';
import { LogSistemaService } from '../servicies/LogSistema.service';

const logService = new LogSistemaService();

export const getLogs = async (req: Request, res: Response) => {
  try {
    const logs = await logService.getAll({
      ciudad: req.query.ciudad as string,
      resultadoConsulta: req.query.resultado as string,
      fuenteNombre: req.query.fuente as string,
    });

    res.json(logs);
  } catch (error) {
    console.error('Error al obtener logs:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};
