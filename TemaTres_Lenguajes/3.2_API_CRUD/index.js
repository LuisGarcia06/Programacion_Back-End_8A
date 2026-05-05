import express from 'express'
import mongoose from 'mongoose';
import { error } from 'node:console';
import dotenv from 'dotenv';
import { dot } from 'node:test/reporters';
import Usuario from './models/usuario_model.js';



dotenv.config();

const app = express();
const puerto = 3000;


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));


app.get('/', (req,res) => {
    res.send("Bienvenido al sistema de CRUD")
})

app.post('/usuarios', async (req,res) => { 
    try{
        const usuarios = await Usuario.create(req.body);
        res.status(201).json(usuarios);
    } catch (error) {
        console.error("Error al crear el usuario: ", error);
        res.status(500).json({error: 'Error al crear el usuario'})
    }
});

app.put('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            id, 
            req.body, 
            { new: true }  // devuelve el documento ya actualizado
        );

        if (!usuarioActualizado) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json(usuarioActualizado);
        console.log(usuarioActualizado);

    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ error: error.message });
    }
});

app.delete('/usuarios/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const usuario = await Usuario.findByIdAndDelete(id);
        if(!usuario){
            return res.status(404).json({error:'Usuario no encontrado'});
        }
        res.status(200).json({message: 'Usuario eliminado'})
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ mensaje: error.message });
    }
});

app.get('/usuarios', async(req,res) => {
    try{
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios)

    }catch(error){
        console.error("Error al obtener los usuarios: ", error);
        res.status(500).json({error: 'Error al obtener los usuarios '})
    }
});

app.get('/usuarios/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const usuario = await Usuario.findById(id);
        res.status(200).json(usuario);
    } catch (error) {
        
    }
})


app.listen(puerto, () => {
    console.log(`Servidor escuchando en http://localhost:${puerto}`);
})

//Conexion de base de datos
const uri = process.env.uri

//Conecta 
mongoose.connect(uri)
    .then(() => {
        console.log("Conexion de exitosa de base de datos");
    })
    .catch((error) => {
        console.error("Error al conectar a la base de datos", error);
    })


