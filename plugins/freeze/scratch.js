import nlp from '../../src/three.js'
import plg from './src/plugin.js'
nlp.plugin(plg)
nlp.verbose('tagger')

nlp.addWords({ 'dr who': 'Place', moose: 'Adverb' }, true)
let doc = nlp('i saw dr. who on ice in Moose, Canada')
doc.debug()
