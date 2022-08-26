/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
import plg from './plugins/dates/src/plugin.js'
nlp.plugin(plg)
nlp.verbose('tagger')

let txt = ''
let doc
// let m

// bug 1
// doc = nlp('we swim')
// console.log(doc.verbs().conjugate())

// bug 2
// doc = nlp('blew').debug()
// console.log(doc.verbs().conjugate())

// bug 3
txt = 'miss'
txt = 'the constable'
// txt = 'lord'
// txt = 'lady'
// txt = 'miss jones'
// txt = 'lord jones'
// txt = 'lady jones'
txt = 'my worst miss'
doc = nlp(txt).debug()


// date issues:
// 'the month before christmas' vs 'a month before christmas'
// middle september
// end of september
// first half of march
// week of june 3rd
// fridays in june
// every saturday
// now
// until christmas