/* eslint-disable no-console, no-unused-vars */
import nlp from './src/one.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')

let txt = ''
let doc
let m


// skips term 'baz'
// doc = nlp("before baz after")
// m = doc.match("before !foo? after").debug()

// doesn't skip term
// doc = nlp("before after")
// m = doc.match("before !foo? after").debug()



// not supported - 3 optionals
doc = nlp(`one after`)
m = doc.match(`one !foo? foo? foo? after`).debug()

// doc = nlp(`one after`)
// m = doc.match(`one !foo? .? after`).debug()

