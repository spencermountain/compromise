import nlp from './one.js'
import preTag from './02-two/preTagger/plugin.js'
import contractions from './02-two/contraction/plugin.js'
import postTag from './02-two/postTagger/plugin.js'

nlp.plugin(preTag)
nlp.plugin(contractions)
nlp.plugin(postTag)

export default nlp
