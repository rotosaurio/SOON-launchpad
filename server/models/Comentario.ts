import { Schema, model, Document, Types } from 'mongoose';

interface IComentario extends Document {
  contenido: string;
  autor: string;
  post: Types.ObjectId; // Cambia esto
}

const comentarioSchema = new Schema<IComentario>({
  contenido: { type: String, required: true },
  autor: { type: String, required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
});

const Comentario = model<IComentario>('Comentario', comentarioSchema);
export default Comentario;
