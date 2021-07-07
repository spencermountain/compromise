import nlp from '../index.js'
import one from '../one/plugin.js'
import two from './plugin.js'

nlp.plugin(one)
nlp.plugin(two)

export default nlp
