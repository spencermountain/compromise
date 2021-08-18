import verbs from './verbs/index.js'
import sentences from './sentences/index.js'
import nouns from './nouns/index.js'
import selections from './selections/index.js'
import abbreviations from './abbreviations.js'
import clauses from './clauses.js'

const chunker = function (View) {
  nouns(View)
  selections(View)
  verbs(View)
  sentences(View)
  abbreviations(View)
  clauses(View)
}
export default chunker
