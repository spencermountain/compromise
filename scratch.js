/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
import plg from './plugins/dates/src/plugin.js'
nlp.plugin(plg)

// nlp.verbose('tagger')

let txt = ''
let doc
let m

// doc = nlp('Those are Great Danes')
// doc.nouns(0).toSingular()
// console.log(doc.text())

let str = nlp('I will do that').verbs().toInfinitive().all().out()
console.log(str)

// console.log(doc.world)
// console.log(nlp.world())