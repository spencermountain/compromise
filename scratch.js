/* eslint-disable no-console, no-unused-vars */
// import './tests/lib/_error.js'
import nlp from './src/index.js'
console.log(nlp.model().lexicon[''])

// nlp.verbose(true)

let str = 'the Spencer Kelly Festival of Silly Walks'
let r = nlp(str)
r.match('@titleCase+').debug()
// r.match('#Noun').data()
// r.terms().slice(0, 2).length
// r.append('constructor').text()

/*
['', '#'],
['', '#'],
['', '#'],
*/
