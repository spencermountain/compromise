/* eslint-disable no-console, no-unused-vars */
import nlp from './src/four.js'

// nlp.verbose('tagger')

let text = 'first pitches'
// text = 'diet traps'
// text = 'tape measures'
// text = '#cool'
const doc = nlp(text).match('#Ordinal').tag('Foo').debug()
// // console.log(nlp.parseMatch('<verb>'))
// console.log(nlp.parseMatch('{cold} .'))
// doc.match('{cold} .').debug()

/*












*/
