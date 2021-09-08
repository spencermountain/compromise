import verbs from './verbs/plugin.js'
import sentences from './sentences/index.js'
import nouns from './nouns/plugin.js'
import selections from './selections/index.js'
import people from './people/plugin.js'
import places from './places/plugin.js'
import clauses from './clauses.js'
import addNumbers from './numbers/plugin.js'
import addFractions from './fractions/plugin.js'
import addPercentages from './percentages/plugin.js'

const chunker = function (View) {
  nouns(View)
  selections(View)
  verbs(View)
  sentences(View)
  people(View)
  places(View)
  clauses(View)
  addNumbers(View)
  addFractions(View)
  addPercentages(View)
}
export default chunker
