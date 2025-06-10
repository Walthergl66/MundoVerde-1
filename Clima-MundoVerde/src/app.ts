import express from 'express';
import { AppDataSource } from './config/data-source';
import * as dotenv from 'dotenv';

// Importación de rutas
import consultaClimaRoutes from './routes/ConsultaClima.route';
import { getAllFuentes } from './controllers/FuenteClimatica.controller';
import logRouter from './controllers/LogSistema.controller';

// Cargar variables de entorno
dotenv.config();

// Inicialización de Express
const app = express();
app.use(express.json());

// Middleware base (puedes agregar CORS o logger aquí si lo deseas)
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/consulta-clima', consultaClimaRoutes);         // GET /api/consulta-clima?ciudad=Quito
app.use('/api/fuentes', getAllFuentes);                      // GET /api/fuentes
app.use('/api/logs', logRouter);                             // GET /api/logs?ciudad=...&resultado=...&fuente=...

// Puerto
const PORT = process.env.PORT || 3000;

// Inicialización de la base de datos y servidor
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
