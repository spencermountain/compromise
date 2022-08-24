/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
import plg from './plugins/dates/src/plugin.js'
nlp.plugin(plg)
// nlp.verbose('tagger')

let txt = ''
// let doc
// let m

// bug 1
let doc = nlp('we swim')
console.log(doc.verbs().conjugate())


// bug 2
doc = nlp('peace and flowers and dove').debug()


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