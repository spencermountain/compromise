import nlp from './one.js'
import preTag from './02-preTagger/plugin.js'
import contractions from './03-contraction/plugin.js'
// import postTag from './04-postTag/plugin.js'

nlp.plugin(preTag)
nlp.plugin(contractions)
// nlp.plugin(postTag)

export default nlp
