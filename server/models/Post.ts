import { Schema, model, Document } from 'mongoose';

interface IPost extends Document {
  titulo: string;
  contenido: string;
  categoria: string;
  autor: string;
  comentarios: string[];  // o el tipo que corresponde a tus comentarios
}

const postSchema = new Schema<IPost>({
  titulo: { type: String, required: true },
  contenido: { type: String, required: true },
  categoria: { type: String, required: true },
  autor: { type: String, required: true },
  comentarios: [{ type: Schema.Types.ObjectId, ref: 'Comentario' }],
});

const Post = model<IPost>('Post', postSchema);
export default Post;
