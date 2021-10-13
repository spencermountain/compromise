/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import nlp from './builds/compromise.cjs'

nlp.verbose('tagger')

// bug!
// let doc = nlp(`extra. one two.`)
// doc.remove('extra')
// console.log(doc.text())

// let txt = 'My first play through of it'
// let txt = 'I am done soaking it'
// let txt = 'I wanted breakfast in bed'
// let txt = 'memories still remind me'
let txt = 'everybody in the tavern'
// let txt = 'precisely to relieve the burden'

let doc = nlp(txt).debug()

doc.compute('chunks').debug('chunks')
doc.nouns().debug()

//
/*












*/
