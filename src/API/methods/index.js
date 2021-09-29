import compute from './compute.js'
import loops from './loops.js'
import out from './out.js'
import sort from './sort.js'
import split from './split.js'
import util from './utils.js'
import whitespace from './whitespace.js'

const methods = Object.assign({}, util, compute, loops, out, sort, split, whitespace)

// aliases
methods.get = methods.eq

export default methods
