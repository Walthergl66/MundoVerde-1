🌱 Clima-MundoVerde
API REST desarrollada en TypeScript y Express que permite consultar datos climáticos en tiempo real desde OpenWeather y almacenarlos en una base de datos Supabase para auditoría y análisis posteriores.

📦 Tecnologías utilizadas
Node.js + Express

* TypeScript

* TypeORM

* Supabase (PostgreSQL gestionado)

* OpenWeather API

* Axios

* Dotenv

* CORS


🔧 Requisitos Previos

Node.js ≥ 18.x

Docker Compose

Cuenta gratuita en OpenWeatherMap para obtener una API key

📦 Instalación y Ejecución

Clona el repositorio:

git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo




⚙️ Configuración del entorno
Crea un archivo .env en la raíz del proyecto con el siguiente contenido:

env
Copiar
Editar
DB_HOST=aws-0-us-east-2.pooler.supabase.com
DB_PORT=6543
DB_USERNAME=postgres.xsdzrbphlibhwmegavsc
DB_PASSWORD=Menendez2025*_*
DB_DATABASE=postgres
PORT=3000
OPENWEATHER_API_KEY=fbf0bedef7d799633876a3253f1e575a
OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5/weather