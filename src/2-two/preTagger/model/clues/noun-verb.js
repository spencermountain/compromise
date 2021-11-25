import noun from './_noun.js'
import verb from './_verb.js'

// 'boot the ball'   -  'the red boot'
// 'boots the ball'  -   'the red boots'
export default {
  beforeTags: Object.assign({}, verb.beforeTags, noun.beforeTags),
  afterTags: Object.assign({}, verb.afterTags, noun.afterTags),
  beforeWords: Object.assign({}, verb.beforeWords, noun.beforeWords),
  afterWords: Object.assign({}, verb.afterWords, noun.afterWords),
}