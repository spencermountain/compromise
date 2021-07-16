/* eslint-disable no-console, no-unused-vars */
// import './tests/lib/_error.js'
import nlp from './src/three/index.js'
// console.log(nlp.model().lexicon[''])

nlp.verbose(true)

let doc = nlp('#cool')
// doc.abbreviations().stripPeriods().debug()
doc.debug()
/*
['', '#'],
['', '#'],
['', '#'],
*/
