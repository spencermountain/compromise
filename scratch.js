/* eslint-disable no-console, no-unused-vars */
import nlp from './src/four.js'
// import nlp from './builds/compromise.cjs'

// nlp.verbose('tagger')

let text = 'he is really walking.'
const doc = nlp(text)
// doc.verbs().toPastTense()
// doc.verbs().toPresentTense()
// doc.debug()

/*












*/
