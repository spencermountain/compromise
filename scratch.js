/* eslint-disable no-console, no-unused-vars */
// import './tests/lib/_error.js'
import nlp from './src/index.js'
// import nlp from './src/one/index.js'

// nlp.verbose(true)

// Todo:
// * multword add lexicon
// .eq(0).terms(0) issue
// .toLowerCase()
const r = nlp('we live in Toronto Canada and it is cold')
r.match('#Place+').unTag('*').debug()

r.match('#Place').debug()

/*
['', '#'],
['', '#'],
['', '#'],
*/
