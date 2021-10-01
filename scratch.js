/* eslint-disable no-console, no-unused-vars */
import nlp from './src/four.js'
// import nlp from './builds/compromise.cjs'

// nlp.verbose('tagger')

let text = 'i will walk to the store'
const doc = nlp(text)
doc.verbs().toPresentTense()
doc.debug()

/*












*/
