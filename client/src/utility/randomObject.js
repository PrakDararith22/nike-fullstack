export function shuffleObjectValues(obj) {
  if (!obj || typeof obj !== "object") {
    console.warn("shuffleObjectValues() received invalid input:", obj);
    return [];
  }

  return Object.values(obj)
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}
