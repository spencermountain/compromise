/* eslint-disable no-console, no-unused-vars */
// import './tests/lib/_error.js'
import nlp from './src/index.js'
// import nlp from './src/one/index.js'

nlp.verbose(true)

let r = nlp(`spencer/town`).match('town').debug()
// console.log(nlp('toronto'))
// let r = nlp('toronto').debug()
// console.log(r.document)
/*
['swore', '#PastTense'],
['tore', '#PastTense'],
['gore', '#Noun'],
['spencer's city/town & cabin', 'spencer city and .'],
['city/town', 'town'],
['', '#'],
['', '#'],
['', '#'],
*/
