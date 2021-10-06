/* eslint-disable no-console, no-unused-vars */
import nlp from './src/four.js'
// import nlp from './builds/compromise.cjs'

// nlp.verbose('tagger')

let doc = nlp(`yeah. one extra two match here three`)
let m = doc.match('match here')
m.freeze()
doc.remove('extra')
m.debug()
// doc.verbs().toInfinitive()
// doc.debug()

/*












*/
