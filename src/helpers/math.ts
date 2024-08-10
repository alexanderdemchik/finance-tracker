export function sum(a: number, b: number) {
  return a + b;
}

export function diff(a: number, b: number) {
  return a - b;
}

export const applyOperation = (num1: number, num2: number, operation?: string) => {
  switch (operation) {
    case '+':
      return sum(num1, num2);
    case '-':
      return diff(num1, num2);
    default:
      return num1;
  }
};
