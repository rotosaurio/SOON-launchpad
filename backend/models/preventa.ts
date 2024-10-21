import mongoose from 'mongoose';

// Definir la interfaz para la estructura de datos de Preventa
interface Preventa {
  _id: mongoose.Types.ObjectId;
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

// Definir el esquema de Mongoose
const preventaSchema = new mongoose.Schema<Preventa>({
  nombre: String,
  direccionContrato: String,
  suministroTotal: String,
  precioPreventas: String,
  fechaListado: String,
  distribucionActivos: {
    liquidez: String,
    bloqueo: String,
    comunidad: String,
    marketing: String,
  },
  descripcion: String,
  informacionContacto: {
    sitioWeb: String,
    twitter: String,
    linkedin: String,
    telegram: String,
    youtube: String,
    facebook: String,
  },
  detallesAdicionales: {
    contribucion: String,
    token: String,
    programaVested: String,
    porcentajeBloqueo: String,
  },
});

// Crear el modelo si no existe
export const PreventaModel = mongoose.models.Preventa || mongoose.model<Preventa>('Preventa', preventaSchema);

// Función para conectar a MongoDB
export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI is not defined in the environment variables');
    process.exit(1);
  }
  console.log('MONGODB_URI:', uri);
  if (mongoose.connections[0].readyState) return;
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}
