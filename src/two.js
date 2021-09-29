import nlp from './one.js'
import preTag from './two/preTagger/plugin.js'
import contractions from './two/contraction/plugin.js'
import postTag from './two/postTagger/plugin.js'

nlp.plugin(preTag)
nlp.plugin(contractions)
nlp.plugin(postTag)

export default nlp
