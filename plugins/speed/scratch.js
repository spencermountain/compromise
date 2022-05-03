/* eslint-disable no-console, no-unused-vars */
import nlp from '../../src/three.js'
import { fileURLToPath } from 'url'
import path from 'path'

const dir = path.dirname(fileURLToPath(import.meta.url))

import { streamFile } from './src/plugin.js'
nlp.plugin(streamFile)

let file = path.join(dir, `./tests/files/freshPrince.txt`)
nlp.streamFile(file, (s) => {
  return s.places()
}).then(doc => {
  doc.debug()
})


// import { keyPress } from './src/plugin.js'
// nlp.extend(keyPress)

// let doc = nlp.keyPress('parsed once. it was the blurst of')
// doc = nlp.keyPress('parsed once. it was the blurst of times')
// doc = nlp.keyPress('parsed once. it was the blurst of timesf')
// doc.debug()