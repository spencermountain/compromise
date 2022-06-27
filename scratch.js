/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

nlp.verbose('tagger')

let txt = ''
// let doc = nlp('33gbps').debug()
// doc = nlp('33 gbps').debug()

// let doc = nlp('50 square feet').debug()
// nlp('team gb').debug()
nlp('3rem').debug()
// let doc = nlp('50 square miles').debug()
// doc.match('#Value #Unit+').debug()
// console.log(doc.has(44000))
// doc.match(44000).debug()
// let doc = nlp('33%').debug()
// doc.match('33 percent').debug()
// console.log(doc.docs[0])
// doc.debug()