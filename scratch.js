/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
import plg from './plugins/dates/src/plugin.js'
nlp.plugin(plg)

// nlp.verbose('tagger')

let txt = ''
let doc
let m


let arr = []

doc = nlp("she will be cool").sentences()
doc.debug()
doc.toPresentTense()
console.log(doc.text())
doc.debug()