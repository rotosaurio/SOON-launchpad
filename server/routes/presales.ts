import express, { Request, Response, Router } from 'express';
import Presale from '../models/Presale'; // Asegúrate de que la ruta a tu modelo es correcta

const router: Router = express.Router();

// Obtener todas las preventas
router.get('/', async (req: Request, res: Response) => {
  await Presale.find()
    .then((presales) => res.json(presales))
    .catch((err) => res.status(400).json(`Error: ${err.message}`));
});

// Obtener una preventa por ID
router.get('/:id', async (req: Request, res: Response) => {
  await Presale.findById(req.params.id)
    .then((presale) => {
      if (!presale) return res.status(404).json({ message: 'Preventa no encontrada' });
      res.json(presale);
    })
    .catch((err) => res.status(400).json(`Error: ${err.message}`));
});

// Crear una nueva preventa
router.post('/', async (req: Request, res: Response) => {
  const newPresale = new Presale(req.body);

  if (!newPresale.direccionContrato) {
    res.sendStatus(401);
    return;
  }

  // Aquí podrías agregar una función de autenticación similar a la que tienes en tu ejemplo
  // const authenticationStatus = authenticateUser(req.body.signedMessage, newPresale.direccionContrato);
  // if (authenticationStatus != AuthenticationStatus.Authenticated) {
  //   res.sendStatus(401);
  //   return;
  // }

  if (await Presale.findOne({ direccionContrato: newPresale.direccionContrato })) {
    res.status(200).json({ message: 'Preventa ya existe' });
    return;
  }

  newPresale
    .save()
    .then(() => res.json('Preventa añadida exitosamente'))
    .catch((err: Error) => res.status(400).json(`Error: ${err.message}`));
});

// Actualizar una preventa
router.patch('/:id', async (req: Request, res: Response) => {
  const presale = req.body;

  // Aquí podrías agregar una función de autenticación similar a la que tienes en tu ejemplo
  // const authenticationStatus = authenticateUser(req.body.signedMessage, req.params.id);
  // if (authenticationStatus != AuthenticationStatus.Authenticated) {
  //   res.sendStatus(401);
  //   return;
  // }

  await Presale.findByIdAndUpdate(req.params.id, presale, { new: true })
    .then((updatedPresale) => {
      if (!updatedPresale) {
        return res.status(404).json({ message: 'Preventa no encontrada' });
      }
      res.json('Datos de preventa actualizados exitosamente');
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ Errmsg: err });
    });
});

// Verificar disponibilidad de la dirección del contrato
router.post('/check-contract-availability', async (req: Request, res: Response) => {
  const direccionContrato = req.body.direccionContrato;
  if (!direccionContrato) {
    res.status(400).json('Por favor proporcione una dirección de contrato');
    return;
  }
  try {
    const result = await Presale.findOne({ direccionContrato });
    res.json({ isAvailable: !result });
  } catch (e) {
    res.status(500).json('Error al verificar la disponibilidad de la dirección del contrato');
  }
});



module.exports = router;
