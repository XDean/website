export function range(start, end) {
  return [...Array(end - start).keys()].map(v => start + v)
}