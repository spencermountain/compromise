/* eslint-disable no-console, no-unused-vars */
import nlp from './src/four.js'

// nlp.verbose('tagger')

let text = 'cold beer'
// text = 'diet traps'
// text = 'tape measures'
// text = '#cool'
const doc = nlp(text)
doc.compute('machine')
doc.compute('chunks')
console.log(doc.json()[0].terms)
// // console.log(nlp.parseMatch('<verb>'))
// console.log(nlp.parseMatch('{cold} .'))
doc.match('{cold} .').debug()

/*












*/
