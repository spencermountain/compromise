/* eslint-disable no-console, no-unused-vars */
import nlp from '../../src/one.js'

// import { streamFile } from './src/plugin.js'
// nlp.plugin(streamFile)

// nlp.streamFile(`./tests/files/freshPrince.txt`, (s) => {
//   return s.places()
// }).then(doc => {
//   doc.debug()
// })


import { keyPress } from './src/plugin.js'
nlp.extend(keyPress)

let doc = nlp.keyPress('parsed once. it was the blurst of')
doc = nlp.keyPress('parsed once. it was the blurst of times')
doc = nlp.keyPress('parsed once. it was the blurst of timesf')
doc.debug()