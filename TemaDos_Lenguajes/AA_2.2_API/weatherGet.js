//Quinto ejercicio ok

import axios from "axios";

const obtenerClima = async () => {
    try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: 'Cancun',          // nombre de la ciudad
                appid: '2116fb5f4fda91f8c576264372a1a3b8',  // así se llama el parámetro
                units: 'metric',      // para que la temperatura sea en °C
                lang: 'es'            // respuesta en español
            }
        });
        console.log('Datos del clima: ', response.data);

    } catch (error) {
        console.error('Error al obtener la información del clima: ', error.response.data)
    }
}

obtenerClima();

