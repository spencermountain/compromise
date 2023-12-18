import nlp from '../../src/three.js'
import plg from './src/plugin.js'
nlp.plugin(plg)

let doc = nlp.tokenize('John Frozen is nice')
doc.match('frozen').freeze()
doc.compute('tagger')
doc.debug()
