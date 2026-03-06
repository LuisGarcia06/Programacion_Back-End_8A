import express from "express";
import bodyParser from "body-parser";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

var nombreEquipo = "";

function registrador(req, res, next) {
    console.log(req.body);
    nombreEquipo = req.body["mascota"] + req.body["adjetivo"];
    next();
}

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "/public/index.html"));
});

// ← registrador solo en esta ruta
app.post("/submit", registrador, (req, res) => {
    res.send(`Tu equipo es: ${nombreEquipo}`);
});

app.listen(port, () => {
    console.log(`Hola el servidor se esta ejecutando en el puerto numero: ${port}`);
});

