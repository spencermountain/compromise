/* eslint-disable no-console, no-unused-vars */
import './tests/lib/_error.js'
import nlp from './src/three/index.js'
// import nlp from './src/one/index.js'

// nlp.verbose(true)

let r = nlp('city/town').debug()

/*
['swore', '#PastTense'],
['tore', '#PastTense'],
['gore', '#Noun'],
['', '#'],
['', '#'],
['', '#'],
*/
