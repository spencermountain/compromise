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
// let txt = 'the quite dirty man and his little dog'
// let txt = 'precisely to relieve the burden'
let doc = nlp(`firemen`).tag('Noun')
// console.log(doc.nouns().toPlural().toSingular())
doc.nouns().toSingular()
// console.log(doc.nouns().json())
// let doc = nlp(txt)
doc.compute('chunks').debug('chunks')
// doc.nouns().debug()
// console.log(doc.nouns().adjectives().out('array'))

//
/*












*/
