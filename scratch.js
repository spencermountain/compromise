/* eslint-disable no-console, no-unused-vars */
import nlp from './src/one.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')

let txt = ''
let doc
let m

// doc = nlp('Those are Great Danes')
// doc.nouns(0).toSingular()
// console.log(doc.text())

doc = nlp('before one two after')
doc.match('before !(not|no|maybe|perhaps)+ after').debug()

// console.log(doc.world)
// console.log(nlp.world())