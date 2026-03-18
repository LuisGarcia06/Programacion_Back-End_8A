
// Cadena JSON

const jsonString = '{"nombre":"Taco de pollo", "Ingredientes":{"proteina": "Pollo", "Salsa": "Salsa Verde"}}';

const objetoDeserializado = JSON.parse(jsonString);

console.log(objetoDeserializado);