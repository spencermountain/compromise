import compute from './compute.js'
import loops from './loops.js'
import util from './utils.js'

const methods = { ...util, ...compute, ...loops }

// aliases
methods.get = methods.eq
export default methods
