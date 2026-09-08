import { Alquiler, Auto, Cliente } from '../models/index.js';

//POST /api/alquileres
export async function crearAlquiler(req, res, next) {
    try {
        const { autoId, fechaInicio, fechaFin } = req.body;
        const clienteId = req.cliente.id;

        // Verificar si el auto está disponible
        const auto = await Auto.findByPk(autoId);
        if (!auto) {
            return res.status(404).json({ mensaje: 'El auto especificado no existe' });
        }

        // Verificar si el auto está disponible
        if (auto.disponibilidad !== 1) {
            return res.status(400).json({ mensaje: 'EL auto no esta disponible' })
        }

        //Registrar el alquiler
        const nuevoAlquiler = await Alquiler.create({
            clienteId,
            autoId,
            fechaInicio,
            fechaFin,
            estado: 'activo'
        })

        // Cambiar la disponibilidad del auto a no disponible 0 (ocupado)
        await auto.update({ disponibilidad: 0 });

        res.status(201).json({
            mensaje: 'Alquiler registrado exitosamente',
            alquiler: nuevoAlquiler
        });

    } catch (error) {
        next(error);
    }
}

//GET /api/alquileres/mis-alquileres (ruta protegida)
export async function listarMisAlquileres(req, res, next) {
    try {
        const alquileres = await Alquiler.findAll({
            where: { clienteId: req.cliente.id },
            include: [
                {
                    model: Auto,
                    attributes: ['marca', 'modelo', 'valorAlquiler', 'anio']
                }
            ]
        });
        res.status(200).json(alquileres);
    } catch (error) {
        next(error);
    }
}

//PUT /api/alquileres/:id/finalizar(ruta protegida)

export async function finalizarAlquiler(req, res, next) {
    try {
        const { id } = req.params;
        const clienteId = req.cliente.id;
        // Buscar el alquiler por su ID y clienteId
        const alquiler = await Alquiler.findOne({
            where: { id, clienteId },
        });

        if (!alquiler) {
            return res.status(404).json({ mensaje: 'Alquiler no encontrado' });
        }

        if (alquiler.estado === 'finalizado') {
            return res.status(400).json({ mensaje: 'El alquiler ya ha sido finalizado' });
        }

        await alquiler.update({ estado: 'finalizado' });

        // Cambiar la disponibilidad del auto a disponible 1
        const auto = await Auto.findByPk(alquiler.autoId);
        if (auto) {
            await auto.update({ disponibilidad: 1 });
        }

        res.status(200).json({
            mensaje: 'Alquiler finalizado exitosamente'
        });
    } catch (error) {
        next(error);
    }
}