//Tercer ejercicio 


import axios from "axios";

const registrarUsuarios = async () => {
    try {
        const respuesta = await axios.post(
            'https://reqres.in/api/register',
            {
                email: 'eve.holt@reqres.in',
                password: 'pistol'
            },
            {
                headers: {                    // 👈 minúscula
                    'x-api-key': 'pro_de6f710875daa58cf161641215caaeb26488c48dd21fe3ad33fbb9a4cb843b1f' // 👈 dos puntos :
                }
            }
        );
        console.log('Registro exitoso', respuesta.data);
    }
    catch (error) {
        console.error('Error en el registro: ', error.response.data)
    } 
}

registrarUsuarios();
