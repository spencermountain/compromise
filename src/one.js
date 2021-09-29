import nlp from './nlp.js'
import match from './01-one/match/plugin.js'
import tag from './01-one/tag/plugin.js'
import pointers from './01-one/pointers/plugin.js'
import cache from './01-one/cache/plugin.js'
import change from './01-one/change/plugin.js'
import tokenize from './01-one/tokenize/plugin.js'

nlp.extend(pointers)
nlp.extend(match)
nlp.extend(tag)
nlp.extend(change)
nlp.extend(cache)
nlp.extend(tokenize)

export default nlp
