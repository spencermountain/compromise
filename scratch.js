/* eslint-disable no-console, no-unused-vars */
// import './tests/lib/_error.js'
import nlp from './src/index.js'
console.log(nlp.model().lexicon[''])

nlp.verbose(true)

const r = nlp('constructor prototype')
r.tag('Verb')
r.match('#Verb').debug()
// r.tag('Adjective')

/*
['', '#'],
['', '#'],
['', '#'],
*/
