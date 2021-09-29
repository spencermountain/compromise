import nlp from './nlp.js'
import lib from './API/lib/plugin.js'
import match from './01-one/match/plugin.js'
import tokenize from './01-one/tokenize/plugin.js'

nlp.extend(lib)
nlp.extend(match)
nlp.extend(tokenize)

export default nlp
