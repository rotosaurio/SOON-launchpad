const express = require('express');
const router = express.Router();
const Presale = require('../models/Presale');

// Obtener todas las preventas
router.get('/', async (req, res) => {
  try {
    const presales = await Presale.find();
    res.json(presales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener una preventa por ID
router.get('/:id', async (req, res) => {
  try {
    const presale = await Presale.findById(req.params.id);
    if (!presale) return res.status(404).json({ message: 'Preventa no encontrada' });
    res.json(presale);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear una nueva preventa
router.post('/', async (req, res) => {
  const presale = new Presale(req.body);
  try {
    const newPresale = await presale.save();
    res.status(201).json(newPresale);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Actualizar una preventa
router.patch('/:id', async (req, res) => {
  try {
    const updatedPresale = await Presale.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPresale);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar una preventa
router.delete('/:id', async (req, res) => {
  try {
    await Presale.findByIdAndDelete(req.params.id);
    res.json({ message: 'Preventa eliminada' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
