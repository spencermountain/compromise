import nlp from './nlp.js'
import lib from './lib/plugin.js'
import tokenize from './01-tokenize/plugin.js'

nlp.extend(lib)
nlp.extend(tokenize)

export default nlp
