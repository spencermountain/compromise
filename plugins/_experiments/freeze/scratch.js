import nlp from '../../../src/three.js'
import plg from './src/plugin.js'
nlp.plugin(plg)

nlp.freeze({
  'dr who': 'Cartoon',
})
let doc = nlp('i saw dr. who on ice.')
doc.debug()
doc.freeze()
