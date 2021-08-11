import nlp from './nlp.js'
import tokenize from './01-tokenize/plugin.js'

nlp.extend(tokenize)
export default nlp
