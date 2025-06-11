import express from 'express';
import { AppDataSource } from './config/data-source';
import * as dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/auth.route';
import consultaClimaRoutes from './routes/ConsultaClima.route';
import fuenteRoutes from './routes/FuenteClimatica.route';
import logRoutes from './routes/LogSistema.routes';
import { verificarToken } from './middlewares/auth.middleware';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta pública (NO protegida con token)
app.use('/api/auth', authRoutes);

// Middleware que protege TODO lo que sigue
app.use(verificarToken);

// Rutas protegidas
app.use('/api/consulta-clima', consultaClimaRoutes);  
app.use('/api/fuentes', fuenteRoutes);                
app.use('/api/logs', logRoutes);                      

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('📡 Data Source initialized');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error initializing Data Source:', error);
  });
