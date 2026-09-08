import { Router } from 'express';
import { crearAuto, listarAutos } from '../controllers/autoController.js';

const router = Router();

router.post('/', crearAuto);
router.get('/', listarAutos);

export default router;