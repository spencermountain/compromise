/* eslint-disable no-console, no-unused-vars */
import nlp from './src/four.js'
// import nlp from './builds/compromise.cjs'

// nlp.verbose('tagger')

// let doc = nlp(`extra. one extra two match here three`)
// let m = doc.match('match here').freeze()
// doc.remove('extra')
// m.debug()

let doc = nlp(`is going to drink`)
doc.verbs().toPresentTense()
doc.debug()

/*












*/
