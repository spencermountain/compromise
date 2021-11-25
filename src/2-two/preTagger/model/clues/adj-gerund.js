import adj from './_adj.js'
import gerund from './_gerund.js'

// rallying the troops
// her rallying cry
const clue = {
  beforeTags: Object.assign({}, adj.beforeTags, gerund.beforeTags),
  afterTags: Object.assign({}, adj.afterTags, gerund.afterTags),
  beforeWords: Object.assign({}, adj.beforeWords, gerund.beforeWords),
  afterWords: Object.assign({}, adj.afterWords, gerund.afterWords),
}
// console.log(clue)
export default clue