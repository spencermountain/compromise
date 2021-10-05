/* eslint-disable no-console, no-unused-vars */
import nlp from './src/four.js'
// import nlp from './builds/compromise.cjs'

// nlp.verbose('tagger')

let text = `he was walking`
let doc = nlp(text)
doc.verbs().toInfinitive()
doc.debug()

/*












*/
