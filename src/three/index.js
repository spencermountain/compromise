import nlp from '../nlp.js'
import one from '../one/plugin.js'
import two from '../two/plugin.js'
import three from './plugin.js'

nlp.plugin(one)
nlp.plugin(two)
nlp.plugin(three)

export default nlp
