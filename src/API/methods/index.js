import caseFns from './case.js'
import clone from './change.js'
import compute from './compute.js'
import insert from './insert.js'
import loops from './loops.js'
// import match from '../../01-one/match/api/match.js'
import out from './out.js'
import replace from './replace.js'
// import sets from '../../01-one/pointers/api/sets.js'
import sort from './sort.js'
import split from './split.js'
// import tag from '../../01-one/tag/api/tag.js'
import util from './utils.js'
// import lookaround from '../../01-one/match/api/lookaround.js'
import whitespace from './whitespace.js'

const methods = Object.assign(
  {},
  util,
  caseFns,
  clone,
  compute,
  insert,
  loops,
  // match,
  out,
  replace,
  // sets,
  sort,
  split,
  // tag,
  // lookaround,
  whitespace
)

// aliases
methods.get = methods.eq
methods.notIf = methods.ifNo

export default methods
