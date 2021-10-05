/* eslint-disable no-console, no-unused-vars */
import nlp from './src/four.js'
// import nlp from './builds/compromise.cjs'

// nlp.verbose('tagger')

let text = `yeah. one extra two match here three`
let doc = nlp(text)
let m = doc.match('match here').freeze()
console.log(m)
// doc.remove('extra')
// doc.remove(m)
// doc.debug()

// doc.verbs().toInfinitive()
// doc.debug()

/*












*/
