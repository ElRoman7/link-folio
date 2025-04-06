<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# LinkFolio

Aplicación tipo "Link in Bio" para gestionar y compartir tus enlaces en un solo perfil.
Desarrollado con NestJS, PostgreSQL y Redis.

## 🧱 Estructura modular

- **auth/**: Autenticación con JWT
- **users/**: Gestión de usuarios
- **links/**: Crear y ordenar enlaces por usuario
- **visits/**: Registro de visitas a los perfiles
- **cache/**: Conexión con Redis
- **jobs/**: Reintentos y procesamiento asincrónico con BullMQ
- **common/**: Pipes, filtros y utilidades compartidas
- **config/**: Configuración por entorno

## ⚙️ Tecnologías utilizadas

- NestJS
- TypeORM
- PostgreSQL
- Redis
- BullMQ
- Docker Compose

## 🚀 ¿Cómo correr la app?

### Base de Datos y Dependencias

````bash
docker-compose up --build

```bash
$ yarn install
````

### Compilar y Correr el proyecto

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```
