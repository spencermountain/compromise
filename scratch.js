/* eslint-disable no-console, no-unused-vars */
import nlp from './src/four.js'
// import nlp from './builds/compromise.cjs'

// nlp.verbose('tagger')

// let doc = nlp(`extra. one extra two match here three`)
// let m = doc.match('match here').freeze()
// doc.remove('extra')
// m.debug()

let str = 'The "auto mechanics" that work for Auto Towing are very friendly'
str = `Now I ~can understand*`
// str = 'we were walking' //Past continuous tense
let doc = nlp(str)
console.log(doc.match('can').text('machine'))
// doc.compute('chunks').debug('chunks')
// doc.questions().debug()
// console.log(doc.verbs().json())

// console.log(doc.verbs().json())
// doc.debug()

// console.log(doc.json())
/*












*/
