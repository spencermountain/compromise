import adj from './_adj.js'
import gerund from './_gerund.js'

// rallying the troops
// her rallying cry
const clue = {
  beforeTags: Object.assign({}, adj.beforeTags, gerund.beforeTags, {
    // Copula: 'Adjective', 
    PresentTense: 'Gerund',
    Plural: 'Gerund'//kids cutting
  }),
  afterTags: Object.assign({}, adj.afterTags, gerund.afterTags),
  beforeWords: Object.assign({
    is: 'Adjective',
    was: 'Adjective'
  }, adj.beforeWords, gerund.beforeWords),
  afterWords: Object.assign({}, adj.afterWords, gerund.afterWords, {
    to: 'Gerund',
    not: 'Gerund',//trying not to car
    the: 'Gerund' //sweeping the country
  }),
}
// console.log(clue)
export default clue