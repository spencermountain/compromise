import nlp from './one.js'
import preTag from './2-two/preTagger/plugin.js'
import contractions from './2-two/contraction/plugin.js'
import postTag from './2-two/postTagger/plugin.js'

nlp.plugin(preTag)
nlp.plugin(contractions)
nlp.plugin(postTag)

export default nlp
