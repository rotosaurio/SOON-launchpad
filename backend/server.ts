import dotenv from 'dotenv';
import path from 'path';
import next from 'next';
import express from 'express';
import apiRouter from './routes/apipreventa';
import { connectDB } from './models/preventa';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev, dir: '.', conf: { distDir: 'dist-next' } });
const handle = nextApp.getRequestHandler();
const port = process.env.PORT || 8080;

async function startServer() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    await nextApp.prepare();
    const server = express();

    // Middleware para parsear JSON
    server.use(express.json());

    // Usar el router de la API
    server.use('/api', apiRouter);

    // Manejar todas las demás rutas con Next.js
    server.all('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer();
