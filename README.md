# 🚗 API RESTful de Alquiler de Autos

API backend desarrollada con **Node.js**, **Express**, **Sequelize ORM** y **PostgreSQL (Neon)** para la gestión integral de reservas de vehículos, autenticación segura con JWT y control reactivo de inventario.

---

## 🛠️ Tecnologías y Herramientas

* **Entorno:** Node.js (ES Modules `"type": "module"`)
* **Framework Web:** Express.js
* **Base de Datos:** PostgreSQL (Alojada en la nube con Neon Tech)
* **ORM:** Sequelize & Sequelize CLI
* **Seguridad y Cifrado:** JSON Web Tokens (`jsonwebtoken`), Bcrypt (`bcrypt`)
* **Control de Acceso:** CORS (`cors`)
* **Entorno y Variables:** Dotenv (`dotenv`)

---

## 📂 Estructura del Proyecto

```text
alquiler-autos/
├── config/
│   └── config.cjs              # Configuración de conexión y dialecto PostgreSQL para Sequelize
├── migrations/
│   ├── 20260101000001-create-autos.cjs
│   ├── 20260101000002-create-clientes.cjs
│   └── 20260101000003-create-alquiler.cjs
├── src/
│   ├── controllers/
│   │   ├── alquilerController.js # Lógica de reservas, validación de stock y finalización
│   │   ├── autoController.js     # Creación y catálogo de vehículos
│   │   └── clienteController.js  # Registro, login y perfil de clientes
│   ├── middlewares/
│   │   └── auth.middleware.js    # Verificación y validación de tokens JWT (Bearer)
│   ├── models/
│   │   ├── alquiler.js           # Modelo Alquiler con asociaciones BelongsTo
│   │   ├── auto.js               # Modelo Auto con asociación HasMany
│   │   ├── cliente.js            # Modelo Cliente con hooks de hash Bcrypt y HasMany
│   │   └── index.js              # Conexión Sequelize, instanciación y registro de modelos
│   ├── routes/
│   │   ├── alquilerRoutes.js     # Enrutador de reservas protegidas
│   │   ├── autoRoutes.js         # Enrutador de flota de vehículos
│   │   └── clienteRoutes.js      # Enrutador de autenticación y clientes
│   ├── app.js                    # Configuración de Express, middlewares globales y rutas
│   └── server.js                 # Inicialización y verificación de base de datos
├── .env.example                  # Plantilla de variables de entorno requeridas
├── package.json
└── README.md
```
## ⚙️ Requisitos Previos

* **Node.js:** v18+ (compatible con v26+)
* **NPM:** v9+
* **Neon Tech:** Cuenta en [Neon.tech](https://neon.tech/) con base de datos PostgreSQL creada

## 🚀 Instalación y Despliegue Local

**1. Clonar el repositorio:**
```bash
git clone [https://github.com/tu-usuario/alquiler-autos.git](https://github.com/tu-usuario/alquiler-autos.git)
cd alquiler-autos
```

**2. Instalar dependencias:**
```bash
npm install
```

**3. Configurar variables de entorno:**
Crea un archivo `.env` en la raíz del proyecto tomando como base `.env.example`:
```env
PORT=3000
DATABASE_URL=postgresql://usuario:password@ep-ejemplo.us-east-2.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=tu_clave_secreta_super_segura
```

**4. Ejecutar las migraciones en la base de datos:**
```bash
npm run migrate
```

**5. Iniciar el servidor en modo desarrollo:**
```bash
npm run dev
```

El servidor estará escuchando en `http://localhost:3000`.

---

## 📋 Diccionario de Endpoints

### 🔐 Autenticación y Clientes (`/api/clientes`)

| Método | Endpoint | Acceso | Descripción |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/clientes/registro` | Público | Registra un nuevo cliente con contraseña cifrada |
| `POST` | `/api/clientes/login` | Público | Autentica al cliente y devuelve un token JWT (2h) |
| `GET` | `/api/clientes/perfil` | 🔒 Protegido | Devuelve la información del cliente autenticado |

**Body Registro (`POST /api/clientes/registro`):**
```json
{
  "nombre": "Ana Lopez",
  "correo": "ana@correo.com",
  "numLic": "LIC-4821",
  "password": "clave123"
}
```

**Body Login (`POST /api/clientes/login`):**
```json
{
  "correo": "ana@correo.com",
  "password": "clave123"
}
```

---

### 🚗 Flota de Vehículos (`/api/autos`)

| Método | Endpoint | Acceso | Descripción |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/autos` | Público | Agrega un nuevo vehículo al inventario |
| `GET` | `/api/autos` | Público | Retorna el catálogo de todos los autos |

**Body Crear Auto (`POST /api/autos`):**
```json
{
  "marca": "Toyota",
  "modelo": "Corolla",
  "imagen": "[https://example.com/corolla.jpg](https://example.com/corolla.jpg)",
  "valorAlquiler": 120000,
  "anio": "2024",
  "disponibilidad": 1
}
```

---

### 📑 Gestión de Alquileres (`/api/alquileres`)

> **Nota:** Todos los endpoints de alquiler requieren enviar el token JWT en la cabecera `Authorization: Bearer <token>`.

| Método | Endpoint | Acceso | Descripción |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/alquileres` | 🔒 Protegido | Reserva un auto disponible y cambia su estado a `0` |
| `GET` | `/api/alquileres/mis-alquileres` | 🔒 Protegido | Lista el historial de reservas del usuario activo |
| `PUT` | `/api/alquileres/:id/finalizar` | 🔒 Protegido | Cierra el alquiler y libera el auto a estado `1` |

**Body Crear Alquiler (`POST /api/alquileres`):**
```json
{
  "autoId": 1,
  "fechaInicio": "2026-09-10",
  "fechaFin": "2026-09-15"
}
```

---

## 🔒 Manejo de Códigos de Respuesta HTTP

* `200 OK`: Consulta o actualización exitosa.
* `201 Created`: Recurso creado exitosamente (Cliente, Auto, Alquiler).
* `400 Bad Request`: Parámetros no válidos o vehículo no disponible para reserva.
* `401 Unauthorized`: Token no proporcionado o credenciales inválidas.
* `403 Forbidden`: Token JWT expirado o firma corrupta.
* `404 Not Found`: Recurso no encontrado (Auto, Cliente o Reserva).
* `409 Conflict`: Correo electrónico ya registrado en el sistema.
* `500 Internal Server Error`: Excepción no controlada gestionada por el middleware de errores.

---
