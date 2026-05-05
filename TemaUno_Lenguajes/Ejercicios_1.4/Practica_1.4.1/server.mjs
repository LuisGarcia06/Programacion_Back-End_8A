//1
// Importa la función 'createServer' del módulo HTTP nativo de Node.js
import { createServer } from 'node:http';

// Define la dirección IP en la que el servidor escuchará
// 127.0.0.1 = localhost (solo accesible desde la misma máquina)
const hostname = '127.0.0.1';

// Define el puerto en el que el servidor estará disponible
const port = 3000;

// Crea el servidor HTTP
// La función callback se ejecuta cada vez que llega una petición (req = request, res = response)
const server = createServer((req, res) => {
  // Establece el código de estado HTTP 200 (OK) — indica que la petición fue exitosa
  res.statusCode = 200;

  // Define el encabezado Content-Type para indicar que la respuesta es texto plano
  res.setHeader('Content-Type', 'text/plain');

  // Envía la respuesta al cliente y cierra la conexión
  res.end('Hola Mundo');
});

// Pone el servidor a escuchar en el puerto y hostname definidos
// El callback se ejecuta una sola vez cuando el servidor está listo
server.listen(port, hostname, () => {
  console.log(`Servidor del archivo server.mjs corriendo en http://${hostname}:${port}/`);
});
