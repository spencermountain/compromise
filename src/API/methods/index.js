import caseFns from './case.js'
import clone from './change.js'
import compute from './compute.js'
import insert from './insert.js'
import loops from './loops.js'
import match from './match.js'
import out from './out.js'
import replace from './replace.js'
import sets from './sets.js'
import sort from './sort.js'
import split from './split.js'
import tag from './tag.js'
import util from './utils.js'
import whitespace from './whitespace.js'

const methods = Object.assign(
  {},
  util,
  caseFns,
  clone,
  compute,
  insert,
  loops,
  match,
  out,
  replace,
  sets,
  sort,
  split,
  tag,
  whitespace
)

// aliases
methods.get = methods.eq

export default methods
