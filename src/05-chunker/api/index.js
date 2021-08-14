import verbs from './verbs/index.js'
import nouns from './nouns/index.js'
import selections from './selections/index.js'

const chunker = function (View) {
  View.prototype.nouns = nouns
  View.prototype.verbs = verbs
  selections(View)
}
export default chunker
