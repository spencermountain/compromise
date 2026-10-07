// Shared CLI colors and styles.
const reset = '\x1b[0m'

const green = s => '\x1b[32m' + s + reset
const red = s => '\x1b[31m' + s + reset
const blue = s => '\x1b[34m' + s + reset
const magenta = s => '\x1b[35m' + s + reset
const cyan = s => '\x1b[36m' + s + reset
const yellow = s => '\x1b[33m' + s + reset
const black = s => '\x1b[30m' + s + reset
const dim = s => '\x1b[2m' + s + reset
const i = s => '\x1b[3m' + s + reset
const b = s => '\x1b[1m' + s + reset
const ul = s => '\x1b[4m' + s + reset
const grey = s => '\x1b[90m' + s + reset

export { green, red, blue, magenta, cyan, yellow, black, dim, i, b, ul, grey }
