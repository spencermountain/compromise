import transform from './transform/index.js'
import expandLexicon from './expand/index.js'
import tagger from './tagger/index.js'
import termMethods from './termMethods/index.js'

export default {
  two: {
    tagger,
    expandLexicon,
    transform,
    termMethods,
  },
}
