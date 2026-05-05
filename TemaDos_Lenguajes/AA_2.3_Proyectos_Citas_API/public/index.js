
//Importaciones
import express from 'express';
import axios from 'axios';
import { fileURLToPath } from 'url';
import path from 'path';

//Rutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Servidor
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../views')); 
app.set('view engine', 'ejs');

//GET
app.get('/', async (req, res) => { 
    try { const result = await axios.get('https://api.animechan.io/v1/quotes/random');
        const quote = result.data.data.content;            
        const character = result.data.data.character.name; 
        const anime = result.data.data.anime.name;         

        res.render('index.ejs', {
            quote: quote,
            character: character,
            anime: anime,
        });

        console.log(result.data);}              
       



//Manejo de errores 
     catch (error) {
        if (error.response) {
            console.log(error.response.data);
        }else {
            console.log('Error:', error.message);
        }

        res.render('index.ejs', {
            quote: 'No se pudo obtener la cita. Intenta de nuevo.',
            character: 'Desconocido',
            anime: 'Desconocido',
        });



        
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

