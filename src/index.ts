import express from 'express';
import type { Request, Response } from 'express';

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.get("/", async (req: Request, res: Response)=>{
    res.json({
        "status": "Servidor en linea",
        "version": "1.0.0"
    });
})