import { jest } from '@jest/globals';
import request from 'supertest';
// Silencia los console.error durante las pruebas
beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
    console.error.mockRestore();
});


// ─── Mock ANTES de importar app y Usuario ───────────────────────
const mockUsuario = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
};

jest.unstable_mockModule('../models/usuario_model.js', () => ({
    default: mockUsuario
}));

// ─── Importar DESPUÉS del mock (orden obligatorio con ES Modules) 
const { default: app } = await import('../app.js');

// ─── Datos de prueba ─────────────────────────────────────────────
const usuarioMock = {
    _id: '64a1b2c3d4e5f6a7b8c9d0e1',
    nombre: 'Juan Pérez',
    edad: 25,
    email: 'juan@example.com',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
};

const usuarioPayload = {
    nombre: 'Juan Pérez',
    edad: 25,
    email: 'juan@example.com'
};

afterEach(() => jest.clearAllMocks());


// ─────────────────────────────────────────────────
// POST /usuarios
// ─────────────────────────────────────────────────
describe('POST /usuarios', () => {

    test('201 - Crea un usuario con nombre, edad y email correctos', async () => {
        mockUsuario.create.mockResolvedValue(usuarioMock);

        const res = await request(app)
            .post('/usuarios')
            .send(usuarioPayload);

        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject({
            nombre: 'Juan Pérez',
            edad: 25,
            email: 'juan@example.com'
        });
        expect(mockUsuario.create).toHaveBeenCalledTimes(1);
    });

    test('500 - Falla si la base de datos lanza un error', async () => {
        mockUsuario.create.mockRejectedValue(new Error('Error de base de datos'));

        const res = await request(app)
            .post('/usuarios')
            .send(usuarioPayload);

        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('error');
    });
});


// ─────────────────────────────────────────────────
// GET /usuarios
// ─────────────────────────────────────────────────
describe('GET /usuarios', () => {

    test('200 - Retorna un arreglo con todos los usuarios', async () => {
        const listaUsuarios = [
            usuarioMock,
            { _id: '64a1b2c3d4e5f6a7b8c9d0e2', nombre: 'Ana López', edad: 30, email: 'ana@example.com' }
        ];
        mockUsuario.find.mockResolvedValue(listaUsuarios);

        const res = await request(app).get('/usuarios');

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveLength(2);
        expect(res.body[0].nombre).toBe('Juan Pérez');
        expect(res.body[1].nombre).toBe('Ana López');
    });

    test('200 - Retorna arreglo vacío cuando no hay usuarios', async () => {
        mockUsuario.find.mockResolvedValue([]);

        const res = await request(app).get('/usuarios');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([]);
    });

    test('500 - Falla si la base de datos lanza un error', async () => {
        mockUsuario.find.mockRejectedValue(new Error('Error de base de datos'));

        const res = await request(app).get('/usuarios');

        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('error');
    });
});


// ─────────────────────────────────────────────────
// GET /usuarios/:id
// ─────────────────────────────────────────────────
describe('GET /usuarios/:id', () => {

    test('200 - Retorna el usuario con sus campos nombre, edad y email', async () => {
        mockUsuario.findById.mockResolvedValue(usuarioMock);

        const res = await request(app).get(`/usuarios/${usuarioMock._id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject({
            _id: usuarioMock._id,
            nombre: 'Juan Pérez',
            edad: 25,
            email: 'juan@example.com'
        });
    });

    test('404 - Retorna error si el ID no existe', async () => {
        mockUsuario.findById.mockResolvedValue(null);

        const res = await request(app).get('/usuarios/id_que_no_existe');

        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('error', 'Usuario no encontrado');
    });

    test('500 - Falla si la base de datos lanza un error', async () => {
        mockUsuario.findById.mockRejectedValue(new Error('Error de base de datos'));

        const res = await request(app).get(`/usuarios/${usuarioMock._id}`);

        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('error');
    });
});


// ─────────────────────────────────────────────────
// PUT /usuarios/:id
// ─────────────────────────────────────────────────
describe('PUT /usuarios/:id', () => {

    test('200 - Actualiza el nombre del usuario correctamente', async () => {
        const actualizado = { ...usuarioMock, nombre: 'Juan Actualizado' };
        mockUsuario.findByIdAndUpdate.mockResolvedValue(actualizado);

        const res = await request(app)
            .put(`/usuarios/${usuarioMock._id}`)
            .send({ nombre: 'Juan Actualizado' });

        expect(res.statusCode).toBe(200);
        expect(res.body.nombre).toBe('Juan Actualizado');
    });

    test('200 - Actualiza la edad del usuario correctamente', async () => {
        const actualizado = { ...usuarioMock, edad: 35 };
        mockUsuario.findByIdAndUpdate.mockResolvedValue(actualizado);

        const res = await request(app)
            .put(`/usuarios/${usuarioMock._id}`)
            .send({ edad: 35 });

        expect(res.statusCode).toBe(200);
        expect(res.body.edad).toBe(35);
    });

    test('200 - Actualiza el email del usuario correctamente', async () => {
        const actualizado = { ...usuarioMock, email: 'nuevo@example.com' };
        mockUsuario.findByIdAndUpdate.mockResolvedValue(actualizado);

        const res = await request(app)
            .put(`/usuarios/${usuarioMock._id}`)
            .send({ email: 'nuevo@example.com' });

        expect(res.statusCode).toBe(200);
        expect(res.body.email).toBe('nuevo@example.com');
    });

    test('404 - Retorna error si el ID no existe', async () => {
        mockUsuario.findByIdAndUpdate.mockResolvedValue(null);

        const res = await request(app)
            .put('/usuarios/id_que_no_existe')
            .send({ nombre: 'Nadie' });

        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('error', 'Usuario no encontrado');
    });

    test('500 - Falla si la base de datos lanza un error', async () => {
        mockUsuario.findByIdAndUpdate.mockRejectedValue(new Error('Error de base de datos'));

        const res = await request(app)
            .put(`/usuarios/${usuarioMock._id}`)
            .send({ nombre: 'Error' });

        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('error');
    });
});


// ─────────────────────────────────────────────────
// DELETE /usuarios/:id
// ─────────────────────────────────────────────────
describe('DELETE /usuarios/:id', () => {

    test('200 - Elimina el usuario y retorna mensaje de confirmación', async () => {
        mockUsuario.findByIdAndDelete.mockResolvedValue(usuarioMock);

        const res = await request(app).delete(`/usuarios/${usuarioMock._id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Usuario eliminado');
    });

    test('404 - Retorna error si el ID no existe', async () => {
        mockUsuario.findByIdAndDelete.mockResolvedValue(null);

        const res = await request(app).delete('/usuarios/id_que_no_existe');

        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('error', 'Usuario no encontrado');
    });

    test('500 - Falla si la base de datos lanza un error', async () => {
        mockUsuario.findByIdAndDelete.mockRejectedValue(new Error('Error de base de datos'));

        const res = await request(app).delete(`/usuarios/${usuarioMock._id}`);

        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('mensaje');
    });
});

