import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send("<h1> Hola mundo <h1>")
    res.sendStatus(200);
});

app.post('/registro', (req, res) => {
    console.log('Registro exitoso');
    res.sendStatus(201);
})

app.put('/usuario/actualizar', (req, res) => {
    console.log('Actualizacion exitosa');
    res.sendStatus(200);
})

app.delete('/usuario/modificar', (req, res) => {
    console.log('Modificacion exitosa');
    res.sendStatus(200);
})

app.patch('/usuario/eliminar', (req, res) => {
    console.log('Eliminación exitosa');
    res.sendStatus(200);
})



app.listen(port, () => {
    console.log(`El servidor se esta ejecutando en el puerto: ${port}`);
})



