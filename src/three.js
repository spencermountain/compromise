import nlp from './two.js'
import chunker from './3-three/chunker/plugin.js'

nlp.plugin(chunker) //~22kb

export default nlp
