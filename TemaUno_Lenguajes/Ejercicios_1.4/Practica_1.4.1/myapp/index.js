
//3
import express from "express";

const app = express();
const port = 3000;


app.get("/", (req, res) => {
    res.send("<h1>Bienvenido a la página web de Luis Bernardo</h1>")
});

app.get("/About", (req, res) => {
    res.send("<h1>Acerca de</h1>")
});

app.get("*path", (req, res) => {
    res.status(404).send("<h1>404 Not Found</h1>")
});

app.listen(port, () => {
    console.log("Servidor ejecutandose en http://localhost:3000");
});




