/* eslint-disable no-console, no-unused-vars */
import nlp from './src/four.js'
// import nlp from './builds/compromise.cjs'

// nlp.verbose('tagger')

// let doc = nlp(`extra. one extra two match here three`)
// let m = doc.match('match here').freeze()
// doc.remove('extra')
// m.debug()

let str = 'john is not walking.'
// str = 'we were walking' //Past continuous tense
let doc = nlp(str)
doc.compute('chunks').debug('chunks')
// console.log(doc.verbs().json())

// doc.verbs().toFutureTense()
// doc.debug()

/*












*/
