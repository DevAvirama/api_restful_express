import { Auto } from '../models/index.js';

// POST /api/autos
export async function crearAuto(req, res, next) {
    try {
        const { marca, modelo, imagen, valorAlquiler, anio, disponibilidad } = req.body;

        const nuevoAuto = await Auto.create({
            marca,
            modelo,
            imagen,
            valorAlquiler,
            anio,
            disponibilidad: disponibilidad ?? 1
        });

        res.status(201).json(nuevoAuto);
    } catch (error) {
        next(error);
    }
}

// GET /api/autos
export async function listarAutos(req, res, next) {
    try {
        const autos = await Auto.findAll();
        res.status(200).json(autos);
    } catch (error) {
        next(error);
    }
}