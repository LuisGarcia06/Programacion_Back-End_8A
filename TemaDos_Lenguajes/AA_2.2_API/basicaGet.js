//Cuarto Ejercicio ok


import axios from "axios";

const obtenerUsuarios = async () => {
    try {
        const response = await axios.get('https://reqres.in/api/users/4', {
            headers: {
                'Authorization': 'Basic ' + Buffer.from('mkmdakdm@reqres.in:gun').toString('base64'),
                'x-api-key': 'pro_de6f710875daa58cf161641215caaeb26488c48dd21fe3ad33fbb9a4cb843b1f'
            }
        });
        console.log('Datos del usuario: ', response.data);
    
    } catch (error) {
        console.error('Error al obtener los datos del usuarios: ', error.response.data)
    }
}

obtenerUsuarios();

