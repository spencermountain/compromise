import noun from './_noun.js'
import gerund from './_gerund.js'

// 'operating the crane', or 'operating room'
const misc = {
  beforeTags: { Copula: 'Gerund', PastTense: 'Gerund', PresentTense: 'Gerund', Infinitive: 'Gerund' },
  afterTags: {},
  beforeWords: { are: 'Gerund', were: 'Gerund', be: 'Gerund', no: 'Gerund', without: 'Gerund' },
  afterWords: {},
}
const clue = {
  beforeTags: Object.assign({}, gerund.beforeTags, noun.beforeTags, misc.beforeTags),
  afterTags: Object.assign({}, gerund.afterTags, noun.afterTags),
  beforeWords: Object.assign({}, gerund.beforeWords, noun.beforeWords, misc.beforeWords),
  afterWords: Object.assign({}, gerund.afterWords, noun.afterWords),
}
// console.log(clue)
export default clue