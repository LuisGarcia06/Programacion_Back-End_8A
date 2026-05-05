//Septimo ok
import axios from "axios";

const obtenerAuth = async () => {
    try {
        const respuesta = await axios.get(
        'https://dummyjson.com/auth/me', {
            headers :   {
                'Authorization' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlbWlseXMiLCJlbWFpbCI6ImVtaWx5LmpvaG5zb25AeC5kdW1teWpzb24uY29tIiwiZmlyc3ROYW1lIjoiRW1pbHkiLCJsYXN0TmFtZSI6IkpvaG5zb24iLCJnZW5kZXIiOiJmZW1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL2VtaWx5cy8xMjgiLCJpYXQiOjE3Nzc1NzgyODcsImV4cCI6MTc3NzU4MTg4N30.PrvG9ZODrUtu-aAGp7ZD3vURA7YzeFbJPAKHmiOxTlM'
            }
        }
        
    );
    console.log('Obtención exitoso', respuesta.data);
    } catch (error) {
        console.error('Error en la obtención: ', error.response.data)
    }
    
}

obtenerAuth();


         