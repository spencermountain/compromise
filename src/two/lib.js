import nlp from '../nlp.js'
import one from '../one/plugin.js'
import two from './plugin.js'

import preTagger from './pre-tagger/plugin.js'
import contractions from './contractions/plugin.js'
import postTagger from './post-tagger/index.js'

nlp.plugin(one)
nlp.plugin(two)

export default nlp
export { preTagger, contractions, postTagger }
