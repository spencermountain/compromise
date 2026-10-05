import Comparative from './Comparative.js'
import Gerund from './Gerund.js'
import Participle from './Participle.js'
import PastTense from './PastTense.js'
import PresentTense from './PresentTense.js'
import Superlative from './Superlative.js'
import AdjToNoun from './AdjToNoun.js'
import { validatePairs } from '../validate.js'

const models = {
  Comparative,
  Gerund,
  Participle,
  PastTense,
  PresentTense,
  Superlative,
  AdjToNoun,
}

validatePairs(models)
export default models
