import express from 'express';
import type { Request, Response } from 'express';
import estudiantesRouter from './routes/estudiantes.js';

const app = express();
const PORT = 3000;

// 1. Middleware global para leer JSON
app.use(express.json());

// 2. Montar el router bajo la ruta base /api/estudiantes
app.use('/api/estudiantes', estudiantesRouter);

// 3. Ruta de prueba del estado del servidor
app.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'Servidor en linea',
    version: '1.0.0'
  });
});

// 4. Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});