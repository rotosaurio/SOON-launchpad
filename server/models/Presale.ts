import mongoose, { Schema, Document } from 'mongoose';

interface IPresale extends Document {
  nombre: string;
  direccionContrato: string;
  suministroTotal: string;
  precioPreventas: string;
  fechaListado: string;
  distribucionActivos: {
    liquidez: string;
    bloqueo: string;
    comunidad: string;
    marketing: string;
  };
  descripcion: string;
  informacionContacto: {
    sitioWeb: string;
    twitter: string;
    linkedin: string;
    telegram: string;
    youtube: string;
    facebook: string;
  };
  detallesAdicionales: {
    contribucion: string;
    token: string;
    programaVested: string;
    porcentajeBloqueo: string;
  };
}

const PreventaSchema: Schema = new Schema({
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

export default mongoose.model<IPresale>('Preventa', PreventaSchema, 'Preventa');
