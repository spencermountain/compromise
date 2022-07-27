/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
import plg from './plugins/dates/src/plugin.js'
nlp.plugin(plg)

// nlp.verbose('tagger')

let txt = ''
let doc
let m


// doc = nlp('two hot dogs please').compute('root')
// doc.swap('hot dog', 'hamburger') //use singular-forms
// doc.debug()

doc = nlp('he ran faster than her').debug()
doc.compute('root')
doc.swap('fast', 'quick')
doc.debug()

// doc = nlp('i dug up the solution, while digging up treasure.')
// doc.compute('root')
// doc.swap('dig up', 'find')
// doc.debug()


