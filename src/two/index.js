import nlp from '../nlp.js'
import one from '../one/plugin.js'
import two from './plugin.js'

import preTagger from './pre-tagger/index.js'
import contractions from './contractions/index.js'
import postTagger from './post-tagger/index.js'

nlp.plugin(one)
nlp.plugin(two)

export default nlp
export { preTagger, contractions, postTagger }
