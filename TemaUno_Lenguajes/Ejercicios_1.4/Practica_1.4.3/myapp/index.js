import express from "express";
import bodyParser from "body-parser";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// Obtiene la ruta del directorio actual (equivalente a __dirname en CommonJS)
const __dirname = dirname(fileURLToPath(import.meta.url));

console.log(__dirname);

// Crea la aplicación Express
const app = express();
const port = 3000;

// Ruta GET "/" → devuelve el archivo index.html de la carpeta /public
app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "/public/index.html"));
});

// Middleware que permite leer datos enviados desde formularios HTML (application/x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta POST "/submit" → recibe los datos del formulario, los imprime en consola y responde con un mensaje
app.post("/submit", (req, res) => {
    console.log(req.body); // Muestra los campos del formulario en la terminal
    res.send("Datos recibidos");
});

// Inicia el servidor y escucha en el puerto 3000
app.listen(port, () => {
    console.log(`Hola el servidor se esta ejecutando en el puerto numero: ${port}`);
});

