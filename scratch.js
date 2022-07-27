/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
import plg from './plugins/dates/src/plugin.js'
nlp.plugin(plg)

// nlp.verbose('tagger')

let txt = ''
let doc
let m



doc = nlp('i dug up the solution, while digging up treasure.')
doc.compute('root')
doc.swap('dig up', 'find')
doc.debug()


