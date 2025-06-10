import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

import { FuenteClimatica } from '../entities/FuenteClimaticaEntity';
import { ConsultaClima } from '../entities/ConsultaClimaEntity';
import { Clima } from '../entities/ClimaEntity';
import { ErrorConsulta } from '../entities/ErrorConsultaEntity';
import { LogSistema } from '../entities/LogSistemaEntity';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'aws-0-us-east-2.pooler.supabase.com',
    port: 6543,
    username: "postgres.xsdzrbphlibhwmegavsc",
    password: "Menendez2025*_*",
    database: "postgres",
    synchronize: true, // En desarrollo solo. En producción usar migraciones.
    logging: false,
    entities: [FuenteClimatica, ConsultaClima, Clima, ErrorConsulta, LogSistema],
    migrations: [],
    subscribers: [],
});
