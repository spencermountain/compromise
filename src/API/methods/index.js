import compute from './compute.js'
import loops from './loops.js'
import util from './utils.js'
import freeze from './freeze.js'

const methods = Object.assign({}, util, compute, loops, freeze)

// aliases
methods.get = methods.eq

export default methods
