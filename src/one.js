import nlp from './nlp.js'
import cache from './1-one/cache/plugin.js'
import change from './1-one/change/plugin.js'
import match from './1-one/match/plugin.js'
import output from './1-one/output/plugin.js'
import pointers from './1-one/pointers/plugin.js'
import tag from './1-one/tag/plugin.js'
import tokenize from './1-one/tokenize/plugin.js'

nlp.extend(cache)
nlp.extend(change)
nlp.extend(output)
nlp.extend(match)
nlp.extend(pointers)
nlp.extend(tag)
nlp.extend(tokenize)

export default nlp
