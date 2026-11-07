// one entry per line, in a template string
export const toList = str => str.trim().split('\n').map(s => s.trim())

// ['a', 'b'] → { a: true, b: true }
export const toHash = list => Object.fromEntries(list.map(s => [s, true]))
