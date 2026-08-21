import express from 'express';
import type { Request, Response } from 'express';

const app = express();
const PORT = 3000;

// 1. Middleware global
app.use(express.json());

// 2. Interface Estudiante y arreglo en memoria
interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  bootcamp: string;
}

const estudiantes: Estudiante[] = [];

// Ruta de prueba inicial
app.get('/', async (req: Request, res: Response) => {
  res.json({
    status: 'Servidor en linea',
    version: '1.0.0'
  });
});

// 3. Endpoints CRUD

// GET - Obtener todos los estudiantes
app.get('/api/estudiantes', (req: Request, res: Response) => {
  res.json(estudiantes);
});

// POST - Crear un estudiante
app.post('/api/estudiantes', (req: Request, res: Response) => {
  const { nombre, email, bootcamp } = req.body;

  // Validación: el email es obligatorio
  if (!email) {
    return res.status(400).json({ error: 'El campo email es obligatorio' });
  }

  // Generación de ID autoincrementable simple
  const nuevoId = estudiantes.length > 0 ? estudiantes[estudiantes.length - 1]!.id + 1 : 1;
  const nuevoEstudiante: Estudiante = {
    id: nuevoId,
    nombre,
    email,
    bootcamp
  };

  estudiantes.push(nuevoEstudiante);
  res.status(201).json(nuevoEstudiante);
});

// PUT Actualizar un estudiante por ID
app.put('/api/estudiantes/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { nombre, email, bootcamp } = req.body;

  const indice = estudiantes.findIndex((e) => e.id === id);

  if (indice === -1) {
    return res.status(404).json({ error: 'Estudiante no encontrado' });
  }

  // Actualizar solo los campos proporcionados o mantener los existentes
  estudiantes[indice] = {
    ...estudiantes[indice],
    ...(nombre && { nombre }),
    ...(email && { email }),
    ...(bootcamp && { bootcamp })
  };

  res.json(estudiantes[indice]);
});

// DELETE   - Eliminar un estudiante por ID
app.delete('/api/estudiantes/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const indice = estudiantes.findIndex((e) => e.id === id);

  if (indice === -1) {
    return res.status(404).json({ error: 'Estudiante no encontrado' });
  }

  const estudianteEliminado = estudiantes.splice(indice, 1);
  res.json({
    mensaje: 'Estudiante eliminado con éxito',
    estudiante: estudianteEliminado[0]
  });
});

// 4. Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});