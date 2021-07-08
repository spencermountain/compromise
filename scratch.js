/* eslint-disable no-console, no-unused-vars */
// import './tests/lib/_error.js'
import nlp from './src/index.js'
// import nlp from './src/one/index.js'

nlp.verbose(true)

// Todo:
// * multword add lexicon
// .eq(0).terms(0) issue
// .toLowerCase()

// const r = nlp('David is amazing..').debug()
const r = nlp("Recently I'm having trouble").debug()

/*
['', '#'],
['', '#'],
['', '#'],
*/
