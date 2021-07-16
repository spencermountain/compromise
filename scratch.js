/* eslint-disable no-console, no-unused-vars */
// import './tests/lib/_error.js'
import nlp from './src/two/index.js'
// console.log(nlp.model().lexicon[''])

// nlp.verbose(true)

let str = 'he is the king of rock. she is the queen of cool.'
let m = nlp(str)
m.match('(king|queen) of (#Noun|#Adjective)').hyphenate()
console.log(m.text())
/*
['', '#'],
['', '#'],
['', '#'],
*/
