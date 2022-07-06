/* eslint-disable no-console, no-unused-vars */
import nlp from './src/one.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')

let txt = ''
let doc
let m



// doc = nlp("before baz after")
// m = doc.match("before !foo after").debug()

// doc = nlp("before baz after")
// m = doc.match("before !foo? after").debug()

// neg
// doc = nlp("before after")
// m = doc.match("before !foo? after").debug()

// (end)
// doc = nlp("before baz after")
// m = doc.match("before !foo?").debug()

doc = nlp.tokenize(`one after`)
m = doc.match(`one !foo? moo? after`).debug()