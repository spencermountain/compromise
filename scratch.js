/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
import plg from './plugins/dates/src/plugin.js'
nlp.plugin(plg)

// nlp.verbose('tagger')

let txt = ''
let doc
let m


// doc = nlp("before bar after")
// doc.match("before !foo? after").debug()

doc = nlp("before bar after")
m = doc.match("before !foo? after").debug()