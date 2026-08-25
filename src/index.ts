import express from 'express';
import type { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import fs from 'node:fs';
import path from 'node:path';
import cors from 'cors';
import estudiantesRouter from './routes/estudiantes.js';  

// 1. Inicializar app
const app = express();
app.use(cors());

// 2. Middlewares globales
app.use(express.json());

const swaggerPath = path.resolve(process.cwd(), 'src', 'swagger_output.json');
const swaggerOutput = JSON.parse(fs.readFileSync(swaggerPath, 'utf-8'));


const PORT = process.env.PORT ?? 3000;


// 3. Servir documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

// 4. Rutas de la API
app.use('/api/students', estudiantesRouter);
app.use('/api/estudiantes', estudiantesRouter);

// Ruta de prueba
app.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'Servidor en linea',
    version: '1.0.0'
  });
});

// 5. Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentación disponible en http://localhost:${PORT}/api-docs`);
});