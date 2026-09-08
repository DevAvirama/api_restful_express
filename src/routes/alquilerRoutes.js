import { Router } from "express";
import { verificarToken } from "../middlewares/auth.middleware.js";
import {
    crearAlquiler,
    listarMisAlquileres,
    finalizarAlquiler
} from "../controllers/alquilerController.js";

const router = Router();

router.post('/', verificarToken, crearAlquiler);
router.get('/mis-alquileres', verificarToken, listarMisAlquileres);
router.put('/:id/finalizar', verificarToken, finalizarAlquiler);

export default router;