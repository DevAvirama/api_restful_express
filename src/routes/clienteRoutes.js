import { Router } from 'express';
import { verificarToken } from '../middlewares/auth.middleware.js';
import {
    registrarCliente,
    loginCliente,
    perfilCliente
} from '../controllers/clienteController.js';

const router = Router();

router.post('/registro', registrarCliente);
router.post('/login', loginCliente);
router.get('/perfil', verificarToken, perfilCliente); // <--- verificarToken debe ir aquí

export default router;