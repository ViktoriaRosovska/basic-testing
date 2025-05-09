// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 4, b: 5, action: Action.Add })).toBe(9);
  });

  test('should subtract two numbers', () => {
    expect(
      simpleCalculator({ a: 100, b: 34, action: Action.Subtract }),
    ).toEqual(66);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 5, action: Action.Multiply })).toBe(15);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 36, b: 6, action: Action.Divide })).toBe(6);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate })).toBe(
      8,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 3, b: 5, action: true })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({ a: 'f', b: 5, action: Action.Multiply }),
    ).toBeNull();
  });
});
