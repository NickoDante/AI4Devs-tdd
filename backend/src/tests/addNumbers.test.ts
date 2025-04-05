import { addNumbers } from '../addNumbers';

describe('addNumbers function', () => {
  // Test case 1: Sumar dos números positivos
  test('suma 1 + 2 para obtener 3', () => {
    // Arrange (Preparar)
    const a = 1;
    const b = 2;
    const expectedResult = 3;

    // Act (Actuar)
    const result = addNumbers(a, b);

    // Assert (Comprobar)
    expect(result).toBe(expectedResult);
  });

  // Test case 2: Sumar un número positivo y uno negativo
  test('suma 5 + (-3) para obtener 2', () => {
    expect(addNumbers(5, -3)).toBe(2);
  });

  // Test case 3: Sumar dos números negativos
  test('suma (-2) + (-2) para obtener -4', () => {
    expect(addNumbers(-2, -2)).toBe(-4);
  });
}); 