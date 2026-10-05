import noun from './_noun.js'
import verb from './_verb.js'
// 'the pilot' vs 'pilot the plane'
const clue = {
  beforeTags: {
    ...verb.beforeTags,
    ...noun.beforeTags
  },
  afterTags: { ...verb.afterTags, ...noun.afterTags },
  beforeWords: { ...verb.beforeWords, ...noun.beforeWords },
  afterWords: { ...verb.afterWords, ...noun.afterWords },
}

export default clue