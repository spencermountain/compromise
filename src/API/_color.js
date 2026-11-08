// Shared CLI colors and styles. Plain text when NO_COLOR is set, as the convention asks
const off = typeof process !== 'undefined' && Object.hasOwn(process.env || {}, 'NO_COLOR')
const color = code => s => (off ? s : '\x1b[' + code + 'm' + s + '\x1b[0m')

const green = color(32)
const red = color(31)
const blue = color(34)
const magenta = color(35)
const cyan = color(36)
const yellow = color(33)
const black = color(30)
const white = color(37)
const dim = color(2)
const i = color(3)
const b = color(1)
const ul = color(4)
const grey = color(90)

export { green, red, blue, magenta, cyan, yellow, black, white, dim, i, b, ul, grey }
