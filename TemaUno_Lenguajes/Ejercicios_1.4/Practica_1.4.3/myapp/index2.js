import express from "express";
import bodyParser from "body-parser";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// Obtiene la ruta del directorio actual
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

// Middleware global: permite leer datos de formularios HTML en todas las rutas
app.use(bodyParser.urlencoded({ extended: true }));

// Variable que almacena el nombre del equipo generado
var nombreEquipo = "";

// Middleware personalizado: se ejecuta ANTES del manejador de /submit
// 1. Imprime el cuerpo de la petición en consola
// 2. Combina los campos "mascota" y "adjetivo" del formulario
// 3. Llama a next() para pasar al siguiente manejador
function registrador(req, res, next) {
    console.log(req.body);
    nombreEquipo = req.body["mascota"] + req.body["adjetivo"];
    next();
}

// Ruta GET "/" → sirve el formulario HTML
app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "/public/index.html"));
});

// Ruta POST "/submit" → primero pasa por `registrador`, luego responde con el nombre del equipo
app.post("/submit", registrador, (req, res) => {
    res.send(`Tu equipo es: ${nombreEquipo}`);
});

// Inicia el servidor en el puerto 3000
app.listen(port, () => {
    console.log(`Hola el servidor se esta ejecutando en el puerto numero: ${port}`);
});

