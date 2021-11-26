import adj from './_adj.js'
import verb from './_verb.js'

// 'would mean' vs 'is mean'
const misc = {
  afterTags: {
    Noun: 'Adjective',//ruling party
    Conjunction: undefined //clean and excellent
  }
}
const clue = {
  beforeTags: Object.assign({}, adj.beforeTags, verb.beforeTags),
  afterTags: Object.assign({}, adj.afterTags, verb.afterTags, misc.afterTags),
  beforeWords: Object.assign({}, adj.beforeWords, verb.beforeWords),
  afterWords: Object.assign({}, adj.afterWords, verb.afterWords),
}
// console.log(clue.beforeWords)
// console.log(clue)
export default clue