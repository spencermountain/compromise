// import nlp from '../../src/three.js'
import nlp from '../../types/two'

let doc = nlp('okay cool')

// ### Pre-tagger
doc.compute('preTagger')
doc.compute('root')
doc.compute('penn')

// ### Contraction-two
doc.compute('contractionTwo')
doc.contractions()
doc.contractions().expand()
doc.contract()

// ### Post-tagger
doc.compute('postTagger')
doc.confidence()


// ### Swap
doc.swap('', '')
