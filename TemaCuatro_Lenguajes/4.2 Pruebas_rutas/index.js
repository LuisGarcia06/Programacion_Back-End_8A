import app from './app.js';         
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.uri)
    .then(() => console.log("Conexión exitosa de base de datos"))
    .catch((error) => console.error("Error al conectar:", error));

app.listen(3000, () => {
    console.log(`Servidor escuchando en http://localhost:3000`);
});

