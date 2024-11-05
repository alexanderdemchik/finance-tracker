export function swipePower(offset: number, absDistance: number): number {
  return (offset / absDistance) * 100;
}
