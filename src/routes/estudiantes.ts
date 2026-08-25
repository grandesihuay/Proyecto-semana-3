import { Router } from 'express';
import type { Request, Response } from 'express';

const router: Router = Router();

interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  bootcamp: string;
}

const estudiantes: Estudiante[] = [];

// GET / Soporta filtrado por ?bootcamp=Nombre
router.get('/', (req: Request, res: Response) => {
  // #swagger.description = 'Obtiene la lista completa de estudiantes o los filtra por bootcamp'
  const { bootcamp } = req.query;

  if (bootcamp && typeof bootcamp === 'string') {
    const estudiantesFiltrados = estudiantes.filter(
      (e) => e.bootcamp.toLowerCase() === bootcamp.toLowerCase()
    );
    return res.json(estudiantesFiltrados);
  }

  res.json(estudiantes);
});

// GET Obtener un estudiante por ID
router.get('/:id', (req: Request, res: Response) => {
  // #swagger.description = 'Obtiene un estudiante específico según su ID'
  const id = Number(req.params.id);
  const estudiante = estudiantes.find((e) => e.id === id);

  if (!estudiante) {
    return res.status(404).json({ error: 'Estudiante no encontrado' });
  }

  res.json(estudiante);
});

// POST Crear estudiante
router.post('/', (req: Request, res: Response) => {
  // #swagger.description = 'Crea un nuevo estudiante y le asigna un ID automático'
  const { nombre, email, bootcamp } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'El campo email es obligatorio' });
  }

  const nuevoId = estudiantes.length > 0 ? estudiantes.at(-1)!.id + 1 : 1;

  const nuevoEstudiante: Estudiante = {
    id: nuevoId,
    nombre,
    email,
    bootcamp
  };

  estudiantes.push(nuevoEstudiante);
  res.status(201).json(nuevoEstudiante);
});

// PUT Actualizar estudiante por ID
router.put('/:id', (req: Request, res: Response) => {
  // #swagger.description = 'Actualiza los datos de un estudiante existente por su ID'
  const id = Number(req.params.id);
  const { nombre, email, bootcamp } = req.body;

  const indice = estudiantes.findIndex((e) => e.id === id);

  if (indice === -1) {
    return res.status(404).json({ error: 'Estudiante no encontrado' });
  }

  estudiantes[indice] = {
    ...estudiantes[indice],
    ...(nombre && { nombre }),
    ...(email && { email }),
    ...(bootcamp && { bootcamp })
  };

  res.json(estudiantes[indice]);
});

// DELETE Eliminar estudiante por ID
router.delete('/:id', (req: Request, res: Response) => {
  // #swagger.description = 'Elimina un estudiante de la lista mediante su ID'
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

export default router;