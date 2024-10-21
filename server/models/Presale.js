const mongoose = require('mongoose');

const PreventaSchema = new mongoose.Schema({
  nombre: String,
  direccionContrato: String,
  suministroTotal: String,
  precioPreventas: String,
  fechaListado: String,
  distribucionActivos: {
    liquidez: String,
    bloqueo: String,
    comunidad: String,
    marketing: String
  },
  descripcion: String,
  informacionContacto: {
    sitioWeb: String,
    twitter: String,
    linkedin: String,
    telegram: String,
    youtube: String,
    facebook: String
  },
  detallesAdicionales: {
    contribucion: String,
    token: String,
    programaVested: String,
    porcentajeBloqueo: String
  }
});

module.exports = mongoose.model('Preventa', PreventaSchema, 'Preventa');
