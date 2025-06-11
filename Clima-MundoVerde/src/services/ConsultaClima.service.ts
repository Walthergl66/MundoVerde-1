import { AppDataSource } from '../config/data-source';
import { ConsultaClima } from '../entities/ConsultaClimaEntity';
import { FuenteClimatica } from '../entities/FuenteClimaticaEntity';
import { Clima } from '../entities/ClimaEntity';
import { ErrorConsulta } from '../entities/ErrorConsultaEntity';
import { LogSistema } from '../entities/LogSistemaEntity';

import axios from 'axios';

interface ClimaAPIResponse {
    main: {
        temp: number;
        humidity: number;
        pressure: number;
    };
    weather: { description: string }[];
    wind: { speed: number };
    coord: { lat: number; lon: number };
}

export class ConsultaClimaService {
    private consultaRepo = AppDataSource.getRepository(ConsultaClima);
    private fuenteRepo = AppDataSource.getRepository(FuenteClimatica);
    private climaRepo = AppDataSource.getRepository(Clima);
    private errorRepo = AppDataSource.getRepository(ErrorConsulta);
    private logRepo = AppDataSource.getRepository(LogSistema);

    // Usaremos OpenWeather como ejemplo. Puedes parametrizar después
    private apiKey = process.env.OPENWEATHER_API_KEY;
    private baseUrl = process.env.OPENWEATHER_BASE_URL!;


    async consultarPorCiudad(ciudad: string) {
        // 1. Verificar si la fuente ya existe
        let fuente = await this.fuenteRepo.findOneBy({ nombre: 'OpenWeather' });
        if (!fuente) {
            fuente = this.fuenteRepo.create({
                nombre: 'OpenWeather',
                urlBase: this.baseUrl,
            });
            await this.fuenteRepo.save(fuente);
        }

        // 2. Crear registro de consulta preliminar
        const consulta = this.consultaRepo.create({
            fuente: { id: fuente.id },
            ciudad,
            latitud: 0,
            longitud: 0,
            fechaConsulta: new Date(),
            exito: false, // temporal
        });
        await this.consultaRepo.save(consulta);

        try {
            // 3. Hacer GET a la API externa
            const response = await axios.get<ClimaAPIResponse>(this.baseUrl, {
                params: {
                    q: ciudad,
                    appid: this.apiKey,
                    units: 'metric',
                    lang: 'es',
                },
            });

            // 4. Guardar datos de Clima
            const data = response.data;
            consulta.latitud = data.coord.lat;
            consulta.longitud = data.coord.lon;
            consulta.exito = true;
            await this.consultaRepo.save(consulta);

            const clima = this.climaRepo.create({
                consulta: { id: consulta.id },
                temperatura: data.main.temp,
                humedad: data.main.humidity,
                presion: data.main.pressure,
                descripcion: data.weather[0].description,
                viento: data.wind.speed,
            });
            await this.climaRepo.save(clima);

            // 5. Guardar log sistema
            const log = this.logRepo.create({
                consulta: { id: consulta.id },
                fuenteNombre: fuente.nombre,
                ciudad,
                resultadoConsulta: 'éxito',
                mensaje: `${clima.temperatura}°C, humedad ${clima.humedad}%`,
                fechaHora: new Date(),
            });
            await this.logRepo.save(log);

            // 6. Preparar respuesta
            return {
                ciudad,
                latitud: consulta.latitud,
                longitud: consulta.longitud,
                fechaConsulta: consulta.fechaConsulta,
                exito: consulta.exito,
                fuenteNombre: fuente.nombre,
                clima,
            };

        } catch (error: any) {
            // 7. Guardar error consulta
            const codigoError = error.response?.status?.toString() || 'Error';
            const mensaje = error.response?.data?.message || error.message;

            const errorConsulta = this.errorRepo.create({
                consulta: { id: consulta.id },
                codigoError,
                mensaje,
                fechaError: new Date(),
            });
            await this.errorRepo.save(errorConsulta);

            // Actualizar consulta
            consulta.exito = false;
            await this.consultaRepo.save(consulta);

            // Guardar log sistema
            const log = this.logRepo.create({
                consulta: { id: consulta.id },
                fuenteNombre: fuente.nombre,
                ciudad,
                resultadoConsulta: 'error',
                mensaje,
                fechaHora: new Date(),
            });
            await this.logRepo.save(log);

            return {
                ciudad,
                fechaConsulta: consulta.fechaConsulta,
                exito: false,
                fuenteNombre: fuente.nombre,
                error: {
                    codigoError,
                    mensaje,
                    fechaError: new Date(),
                },
            };
        }
    }
}
