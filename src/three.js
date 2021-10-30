import nlp from './two.js'
import chunker from './3-three/chunker/plugin.js'
import nouns from './3-three/nouns/plugin.js'
import numbers from './3-three/numbers/plugin.js'
import sentences from './3-three/sentences/plugin.js'
import subjects from './3-three/topics/plugin.js'
import verbs from './3-three/verbs/plugin.js'
import redact from './3-three/redact/plugin.js'

nlp.plugin(chunker) //
nlp.plugin(nouns) //
nlp.plugin(numbers) //
nlp.plugin(sentences) //
nlp.plugin(subjects) //
nlp.plugin(verbs) //
nlp.plugin(redact) //

export default nlp
