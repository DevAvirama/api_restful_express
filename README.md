# API RESTful de Alquiler de Vehículos — Node.js, Express & PostgreSQL

API RESTful transaccional desarrollada en **Node.js** y **Express** bajo patrón arquitectónico **MVC**, diseñada para gestionar inventario vehicular, reservas y control de disponibilidad con persistencia relacional en **PostgreSQL serverless (Neon)** y despliegue continuo en **Render**.

- **Servicio en producción:** [api-restful-express.onrender.com](https://api-restful-express.onrender.com)
- **Portafolio:** [santiagoavirama.dev](https://santiagoavirama.dev)

---

## Arquitectura MVC y Flujo de Datos

```mermaid
flowchart LR
    CLIENT[Cliente HTTP / Frontend] --> ROUTES[Express Router]
    ROUTES --> AUTH[Middleware JWT Stateless]
    AUTH --> CTRL[Controladores MVC]
    CTRL --> ORM[Sequelize ORM + Migraciones]
    ORM --> NEON[(PostgreSQL Serverless — Neon.tech)]
```

### Características Técnicas

- **Autenticación Sin Estado (_Stateless_):** Registro e inicio de sesión protegidos mediante hashing criptográfico con `Bcrypt` y emisión de tokens `JWT`.
- **Integridad Relacional y Migraciones:** Esquemas y relaciones entre usuarios, flota vehicular y reservas versionados con `Sequelize CLI`.
- **Control de Disponibilidad:** Validación de rangos de fechas en reservas para prevenir solapamientos sobre un mismo vehículo.

---

## Endpoints Principales

| Método           | Ruta                 | Autenticación | Descripción                                            |
| :--------------- | :------------------- | :------------ | :----------------------------------------------------- |
| `POST`           | `/api/auth/register` | Pública       | Registro de usuario con contraseña encriptada          |
| `POST`           | `/api/auth/login`    | Pública       | Autenticación y emisión de `JWT`                       |
| `GET`            | `/api/vehiculos`     | Pública / JWT | Listado y filtrado de flota disponible                 |
| `POST`           | `/api/vehiculos`     | JWT           | Creación de nuevo registro vehicular                   |
| `PUT` / `DELETE` | `/api/vehiculos/:id` | JWT           | Actualización o baja de vehículo                       |
| `POST`           | `/api/reservas`      | JWT           | Creación de reserva con verificación de disponibilidad |

---

## Variables de Entorno

| Variable       | Descripción                               | Ejemplo                                                     |
| :------------- | :---------------------------------------- | :---------------------------------------------------------- |
| `PORT`         | Puerto HTTP del servidor Express          | `3000`                                                      |
| `DATABASE_URL` | Cadena de conexión PostgreSQL (Neon.tech) | `postgres://user:pass@ep-host.neon.tech/db?sslmode=require` |
| `JWT_SECRET`   | Secreto de firma para JSON Web Tokens     | `super_secret_key`                                          |

---

## Ejecución Local

```bash
git clone [https://github.com/DevAvirama/api_restful_express.git](https://github.com/DevAvirama/api_restful_express.git)
cd api_restful_express
cp .env.example .env
npm install
npx sequelize-cli db:migrate
npm run dev
```
