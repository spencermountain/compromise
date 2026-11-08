// shared by the DEBUG_DATE traces and .dates().debug()
const env = globalThis.process?.env ?? globalThis.env ?? {}
const off = Object.hasOwn(env, 'NO_COLOR')
const color = code => str => (off ? str : '\x1b[' + code + 'm' + str + '\x1b[0m')
const green = color(32)
const cyan = color(36)
const magenta = color(35)
const dim = color(2)
const isDebug = () => Boolean(env.DEBUG_DATE)

export { green, cyan, magenta, dim, isDebug }
