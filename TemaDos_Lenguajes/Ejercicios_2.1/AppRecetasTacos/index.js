//Quinto ejercicio ok
import express from "express";
import bodyParser from "body-parser";
import path from 'path';
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Leer el JSON
// ✅ Sin .tacos — el JSON ya ES el array
const recetasTacos = JSON.parse(
  readFileSync(path.join(__dirname, 'recetasTacos.json'), 'utf-8')
);


// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Ruta para obtener receta por tipo
app.get('/receta/:type', (req, res) => {
  const elegirTaco = recetasTacos.find(
    r => r.ingredientes.proteina.nombre.toLowerCase() === req.params.type.toLowerCase()
  );
  res.json(elegirTaco || { error: "Receta no encontrada" });
});

app.listen(port, () => {
  console.log("Servidor ejecutandose en http://localhost:3000");
});

