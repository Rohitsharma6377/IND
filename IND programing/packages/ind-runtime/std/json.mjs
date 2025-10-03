export function parse(str) {
  return JSON.parse(str);
}

export function stringify(value, space = 0) {
  return JSON.stringify(value, null, space);
}
