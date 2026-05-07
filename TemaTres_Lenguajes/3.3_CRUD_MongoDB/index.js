import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
let db;


const app = express();
const puerto = 3000;


app.use(express.json());        
app.use(express.urlencoded({ extended: true }))

async function conectarBD(){
    const uri = process.env.uri;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        db = client.db('test');
        console.log('Conexion de base exitosa');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }     

}

app.get('/usuarios', async(req,res) => {
  try {
        const usuarios = await db.collection('usuarios').find({}).toArray();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }

    
})

app.post('/usuarios', async(req,res) => {
    const nuevoUsuario = req.body;
    const result = await db.collection('usuarios').insertOne(nuevoUsuario);
    res.status(201).json({ message: 'Usuario creado', id: result.insertedId });
});

app.put('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;
        const result = await db.collection('usuarios').updateOne(
            { _id: new ObjectId(id) }, 
            { $set: datosActualizados }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.status(200).json({ mensaje: 'Usuario actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar', error: error.message });
    }
});

app.delete('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.collection('usuarios').deleteOne(
            { _id: new ObjectId(id) }
        );

        if (result.deletedCount === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar', error: error.message });
    }
});

app.get('/', (req,res)=>{
    res.send('Bienvenido al sistema CRUD')
})

app.listen(puerto, ()=>{
    console.log(`Servidor escuchando en http://localhost:${puerto}`);
});

conectarBD().catch(console.dir);

