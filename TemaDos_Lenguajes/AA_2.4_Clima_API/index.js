//Importar las dependencias 
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//Inicializar la aplicación de Express
const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'http://api.weatherapi.com/v1';


//Middleware para servir archivos estáticos
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//Ruta principal
app.get('/api/weather/forecast', async (req, res) => {
    const { city, days = 3 } = req.query;
    if (!city) return res.status(400).json({ error: 'City parameter is required' });


    try {
        const response = await axios.get(`${BASE_URL}/forecast.json`, {
            params: {
                key: API_KEY,
                q: city,
                days,
                'lang': 'es'
            }
        });
        res.json(response.data)
    }
    catch (error) {
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data.error.message });
        } else {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


