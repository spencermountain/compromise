import nlp from './nlp.js'
import lib from './API/lib/plugin.js'
import tokenize from './one/tokenize/plugin.js'

nlp.extend(lib)
nlp.extend(tokenize)

export default nlp
