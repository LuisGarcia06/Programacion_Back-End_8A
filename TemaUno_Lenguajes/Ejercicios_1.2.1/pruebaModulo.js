// ========== principal.js ==========
// Importar el módulo de matemáticas

const matematicas = require('./index.js');


console.log("========== USANDO EL MÓDULO DE MATEMÁTICAS ==========\n");

// Usar la función suma
console.log("--- SUMA ---");
let resultadoSuma = matematicas.suma(10, 5);
console.log(`10 + 5 = ${resultadoSuma}`);

// Usar la función resta
console.log("\n--- RESTA ---");
let resultadoResta = matematicas.resta(20, 8);
console.log(`20 - 8 = ${resultadoResta}`);

// Usar la función multiplicación
console.log("\n--- MULTIPLICACIÓN ---");
let resultadoMulti = matematicas.multiplicacion(6, 7);
console.log(`6 × 7 = ${resultadoMulti}`);

// Usar la función división
console.log("\n--- DIVISIÓN ---");
let resultadoDiv = matematicas.division(100, 4);
console.log(`100 ÷ 4 = ${resultadoDiv}`);

let resultadoDivCero = matematicas.division(10, 0);
console.log(`10 ÷ 0 = ${resultadoDivCero}`);

// Usar la función potencia
console.log("\n--- POTENCIA ---");
let resultadoPot = matematicas.potencia(2, 8);
console.log(`2^8 = ${resultadoPot}`);

// Usar la función raíz cuadrada
console.log("\n--- RAÍZ CUADRADA ---");
let resultadoRaiz = matematicas.raizCuadrada(144);
console.log(`√144 = ${resultadoRaiz}`);

// Usar la función módulo
console.log("\n--- MÓDULO (RESIDUO) ---");
let resultadoMod = matematicas.modulo(17, 5);
console.log(`17 % 5 = ${resultadoMod}`);

// Usar la función promedio
console.log("\n--- PROMEDIO ---");
let numeros = [10, 20, 30, 40, 50];
let resultadoProm = matematicas.promedio(numeros);
console.log(`Promedio de [${numeros}] = ${resultadoProm}`);

// Usar la función valor absoluto
console.log("\n--- VALOR ABSOLUTO ---");
let resultadoAbs = matematicas.valorAbsoluto(-25);
console.log(`|-25| = ${resultadoAbs}`);

console.log("\n" + "=".repeat(50));
console.log("CÁLCULOS COMBINADOS");
console.log("=".repeat(50));

// Combinar varias funciones
let a = 5;
let b = 3;
let sumaResult = matematicas.suma(a, b);
let potenciaResult = matematicas.potencia(sumaResult, 2);
console.log(`(${a} + ${b})² = ${potenciaResult}`);

let promedioCalif = matematicas.promedio([85, 90, 78, 92, 88]);
console.log(`Promedio de calificaciones: ${promedioCalif.toFixed(2)}`);

