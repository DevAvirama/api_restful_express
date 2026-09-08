import express from 'express';
import cors from 'cors';
import clienteRoutes from './routes/clienteRoutes.js';
import autoRoutes from './routes/autoRoutes.js';
import alquilerRoutes from './routes/alquilerRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({
        mensaje: 'API de Alquiler de Autos funcionando correctamente'
    });
});

// Registrar rutas de clientes
app.use('/api/clientes', clienteRoutes);

// Registrar rutas de autos
app.use('/api/autos', autoRoutes);

// Registrar rutas de alquileres
app.use('/api/alquileres', alquilerRoutes);

// middleware para manejar errores
app.use((err, req, res, next) => {
    console.error('Error no controlado:', err.stack || err.message);
    res.status(err.status || 500).json({
        error: err.message || 'Error interno del servidor'
    });
});

export default app;