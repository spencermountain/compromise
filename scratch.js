/* eslint-disable no-console, no-unused-vars */
import nlp from './src/four.js'
// import nlp from './builds/compromise.cjs'

// nlp.verbose('tagger')

// let doc = nlp(`extra. one extra two match here three`)
// let m = doc.match('match here').freeze()
// doc.remove('extra')
// m.debug()

// let str = 'The "auto mechanics" that work for Auto Towing are very friendly'
// str = 'we were walking' //Past continuous tense
let doc = nlp(`one two three`)
let b = nlp('four')
doc.append(b).debug()

/*












*/
