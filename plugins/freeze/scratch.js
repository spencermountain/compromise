import nlp from '../../src/three.js'
import plg from './src/plugin.js'
nlp.plugin(plg)

let doc = nlp('one two three four.')
doc.match('two three').freeze()
doc.tag('Person')
doc.debug()
