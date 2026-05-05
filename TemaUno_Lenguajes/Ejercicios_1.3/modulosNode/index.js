const fs = require('fs');

fs.writeFile('prueba1.txt', 'Hola mundo :) !!!', (err) => {
    if (err) throw err;
    console.log('El archivo se creo con exito.');
});

// fs.readFile('archivo.txt', (error,data) => {
//     if(!error) {
//         console.log(data);
//     }  else {
//         console.log(`Error ${error}`);
//     }


// });

// fs.readFile('prueba.txt', 'utf-8', (error, data) => {
//     if (!error) {
//         console.log(data);
//     } else {
//         console.log(`Error ${error}`);
//     }


// });

