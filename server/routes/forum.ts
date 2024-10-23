import { Router, Request, Response, NextFunction } from 'express';
import Post from '../models/Post';
import Comentario from '../models/Comentario';

const router: Router = Router();

// Crear un nuevo post
router.post('/posts', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { titulo, contenido, categoria, autor } = req.body;
    const newPost = new Post({
      titulo,
      contenido,
      categoria,
      autor
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
});

// Obtener todos los posts
router.get('/posts', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

// Obtener un post específico
router.get('/posts/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('comentarios');
    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
});

// Actualizar un post
router.put('/posts/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { titulo, contenido, categoria } = req.body;
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { titulo, contenido, categoria },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
});

// Eliminar un post
router.delete('/posts/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }
    await Comentario.deleteMany({ post: req.params.id });
    res.json({ message: 'Post eliminado correctamente' });
  } catch (error) {
    next(error);
  }
});

// Crear un nuevo comentario
router.post('/posts/:id/comentarios', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { contenido, autor } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }
    const newComentario = new Comentario({
      contenido,
      autor,
      post: post._id
    });
    const savedComentario = await newComentario.save();
    post.comentarios.push(savedComentario.id);
    await post.save();
    res.status(201).json(savedComentario);
  } catch (error) {
    next(error);
  }
});

// Eliminar un comentario
router.delete('/comentarios/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const comentario = await Comentario.findByIdAndDelete(req.params.id);
    if (!comentario) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }
    res.json({ message: 'Comentario eliminado correctamente' });
  } catch (error) {
    next(error);
  }
});

export default router;
