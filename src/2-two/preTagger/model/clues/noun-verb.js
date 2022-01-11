import noun from './_noun.js'
import verb from './_verb.js'

// 'boot the ball'   -  'the red boot'
// 'boots the ball'  -   'the red boots'
const clue = {
  beforeTags: Object.assign({}, verb.beforeTags, noun.beforeTags, {
    // Noun: undefined
    Adjective: 'Singular',//great name
  }),
  afterTags: Object.assign({}, verb.afterTags, noun.afterTags, {
    ProperNoun: 'Infinitive', Gerund: 'Infinitive', Adjective: 'Infinitive',
    Copula: 'Singular',
  }),
  beforeWords: Object.assign({}, verb.beforeWords, noun.beforeWords, {
    // is time
    is: 'Singular', was: 'Singular'
  }),
  afterWords: Object.assign({}, verb.afterWords, noun.afterWords, {
    // for: 'Infinitive',//work for
    instead: 'Infinitive',
  }),
}
// console.log(clue.beforeTags)
export default clue