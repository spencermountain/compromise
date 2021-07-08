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
// const r = nlp('I could spend a year in Spain').debug()
const r = nlp('Anything after 12 is a bonus').debug()

// console.log(nlp.model().lexicon.time)
/*
['', '#'],
['', '#'],
['', '#'],
*/
