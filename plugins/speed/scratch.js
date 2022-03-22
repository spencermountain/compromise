/* eslint-disable no-console, no-unused-vars */
import nlp from '../../src/one.js'

import { streamFile } from './src/plugin.js'
nlp.plugin(streamFile)



nlp.streamFile(`./tests/files/freshPrince.txt`, (s) => {
  return s.places()
}).then(doc => {
  doc.debug()
})
