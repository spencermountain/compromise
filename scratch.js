/* eslint-disable no-console, no-unused-vars */
// import './tests/lib/_error.js'
import nlp from './src/index.js'
console.log(nlp.model().lexicon[''])

// nlp.verbose(true)

let str = 'a f a a b c c'
let r = nlp(str).terms().sort('freq').debug()
// r.match('#Noun').data()
// r.terms().slice(0, 2).length
// r.append('constructor').text()

/*
['', '#'],
['', '#'],
['', '#'],
*/
