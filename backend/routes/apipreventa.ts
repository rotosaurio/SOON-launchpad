import express, { Request, Response, NextFunction } from 'express';
import { PreventaModel, connectDB } from '../models/preventa';

const router = express.Router();

// Interfaz para los parámetros de la ruta
interface RequestParams {
  id?: string;
}

// Obtener todas las preventas
router.get('/preventas', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const preventas = await PreventaModel.find();
    res.json(preventas);
  } catch (error) {
    next(error);
  }
});

// Obtener una preventa por ID
router.get('/preventas/:id', async (req: Request<RequestParams>, res: Response, next: NextFunction) => {
  try {
    const preventa = await PreventaModel.findById(req.params.id);
    if (!preventa) {
      return res.status(404).json({ message: 'Preventa no encontrada' });
    }
    res.json(preventa);
  } catch (error) {
    next(error);
  }
});

// Crear una nueva preventa
router.post('/preventas', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const nuevaPreventa = new PreventaModel(req.body);
    const preventaGuardada = await nuevaPreventa.save();
    res.status(201).json(preventaGuardada);
  } catch (error) {
    next(error);
  }
});

// Actualizar una preventa
router.put('/preventas/:id', async (req: Request<RequestParams>, res: Response, next: NextFunction) => {
  try {
    const preventaActualizada = await PreventaModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!preventaActualizada) {
      return res.status(404).json({ message: 'Preventa no encontrada' });
    }
    res.json(preventaActualizada);
  } catch (error) {
    next(error);
  }
});

// Eliminar una preventa
router.delete('/preventas/:id', async (req: Request<RequestParams>, res: Response, next: NextFunction) => {
  try {
    const preventaEliminada = await PreventaModel.findByIdAndDelete(req.params.id);
    if (!preventaEliminada) {
      return res.status(404).json({ message: 'Preventa no encontrada' });
    }
    res.json({ message: 'Preventa eliminada correctamente' });
  } catch (error) {
    next(error);
  }
});

export default router;
