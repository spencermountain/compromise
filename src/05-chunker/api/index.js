import verbs from './verbs/index.js'
import sentences from './sentences/index.js'
import nouns from './nouns/index.js'
import selections from './selections/index.js'
import abbreviations from './abbreviations.js'
import people from './people/index.js'
import places from './places/index.js'
import clauses from './clauses.js'

const chunker = function (View) {
  nouns(View)
  selections(View)
  verbs(View)
  sentences(View)
  people(View)
  places(View)
  abbreviations(View)
  clauses(View)
}
export default chunker
