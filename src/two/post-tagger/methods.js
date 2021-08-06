import compile from './compile/index.js'
import bulkMatch from './matcher/index.js'
import bulkTagger from './tagger/index.js'
import canBe from './tagger/canBe.js'
import postProcess from './postProcess/index.js'

export default {
  compile,
  bulkMatch,
  bulkTagger,
  canBe,
  postProcess,
}
