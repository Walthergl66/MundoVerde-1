import { Request, Response } from 'express';
import { generarToken } from '../utils/jwt';

const validarCredenciales = (usuario: string, contraseña: string): boolean => 
    usuario === 'admin' && contraseña === '1234';

export const login = async (req: Request, res: Response): Promise<Response> => {
    const { usuario, contraseña } = req.body;

    if (validarCredenciales(usuario, contraseña)) {
        const token = generarToken({ usuario });
        return res.json({ token });
    }

    return res.status(401).json({ error: 'Credenciales inválidas' });
};

