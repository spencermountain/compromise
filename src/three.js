import nlp from './two.js'
import chunker from './three/chunker/plugin.js'

nlp.plugin(chunker)

export default nlp
