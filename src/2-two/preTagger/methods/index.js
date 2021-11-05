import transform from './transform/index.js'
import expandLexicon from './expand/index.js'
import quickSplit from './quickSplit.js'

export default {
  two: {
    quickSplit,
    expandLexicon,
    transform,
  },
}
