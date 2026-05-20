test('Comparar dos objetos', () => {
    const obj1 = {nombre: 'Luis', edad: 22}
    const obj2 = {nombre: 'Luis', edad: 22}
    expect(obj1).toEqual(obj2);
})


