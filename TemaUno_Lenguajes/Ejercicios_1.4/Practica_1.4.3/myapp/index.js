import express from "express";
import bodyParser from "body-parser";
import { dirname, join } from "path";
import { fileURLToPath } from "url";


const __dirname = dirname(fileURLToPath(import.meta.url));

console.log(__dirname); // ← dos guiones bajos

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "/public/index.html"));
});

app.use(bodyParser.urlencoded({extended:true}));

app.post("/submit", (req,res) => {
    console.log(req.body);
    res.send("Datos recibidos")
});

app.listen(port, () => {
    console.log(`Hola el servidor se esta ejecutando en el puerto numero: ${port}`);
});
