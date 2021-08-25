import compute from './compute.js'
import out from './out.js'
import util from './utils.js'
import match from './match.js'
import sort from './sort.js'
import whitespace from './whitespace.js'
import split from './split.js'
import tag from './tag.js'
import insert from './insert.js'
import loops from './loops.js'
import clone from './change.js'
import sets from './sets.js'

const methods = Object.assign({}, util, out, match, tag, sort, whitespace, split, insert, loops, compute, clone, sets)

// aliases
methods.get = methods.eq

export default methods
