import verbs from './verbs/index.js'
import sentences from './sentences/index.js'
import nouns from './nouns/index.js'
import selections from './selections/index.js'

const chunker = function (View) {
  nouns(View)
  selections(View)
  verbs(View)
  sentences(View)
}
export default chunker
