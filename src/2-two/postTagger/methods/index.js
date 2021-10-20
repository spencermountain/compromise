import compile from './compile/index.js'
import bulkMatch from './matcher/index.js'
import bulkTagger from './tagger/index.js'
import canBe from './canBe.js'

export default {
  two: {
    compile,
    bulkMatch,
    bulkTagger,
    canBe,
  },
}
