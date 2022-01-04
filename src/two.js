import nlp from './one.js'
import preTag from './2-two/preTagger/plugin.js'
import contractions from './2-two/contraction/plugin.js'
import postTag from './2-two/postTagger/plugin.js'

nlp.plugin(preTag) //~103kb  
nlp.plugin(contractions) //~6kb
nlp.plugin(postTag) //~33kb

export default nlp
