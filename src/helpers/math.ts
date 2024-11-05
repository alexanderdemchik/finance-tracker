export function sum(a: number, b: number) {
  return a + b;
}

export function diff(a: number, b: number) {
  return a - b;
}

export function multiply(a: number, b: number) {
  return a * b;
}

export function divide(a: number, b: number) {
  return a / b;
}

export const applyOperation = (num1: number, num2: number, operation?: string) => {
  if (!Number.isFinite(num2)) {
    return num1;
  }

  switch (operation) {
    case '+':
      return sum(num1, num2);
    case '-':
      return diff(num1, num2);
    case '*':
      return multiply(num1, num2);
    case '/':
      return divide(num1, num2);
    default:
      return num1;
  }
};
