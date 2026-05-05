//Sexto ejercicio ok
import axios from "axios";

const registrarAuth = async () => {
    try {
        const respuesta = await axios.post(
        'https://dummyjson.com/auth/login',
        {
            username : 'emilys',
            password : 'emilyspass',

        },

        {withCredentials: true}
    );
    console.log('Registro exitoso', respuesta.data);
    } catch (error) {
        console.error('Error en el registro: ', error.response.data)
    }
    
}

registrarAuth();

