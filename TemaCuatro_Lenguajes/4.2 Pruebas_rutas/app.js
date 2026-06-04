import express from 'express';
import Usuario from './models/usuario_model.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send("Bienvenido al sistema de CRUD");
});

app.post('/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.create(req.body);
        res.status(201).json(usuarios);
    } catch (error) {
        console.error("Error al crear el usuario: ", error);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
});

app.put('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        if (!usuarioActualizado) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(usuarioActualizado);
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ error: error.message });
    }
});

app.delete('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByIdAndDelete(id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ mensaje: error.message });
    }
});

app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error("Error al obtener los usuarios: ", error);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
});

app.get('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ error: error.message });
    }
});

export default app;