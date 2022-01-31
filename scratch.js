/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')

let txt = ''

txt = `Dr. Miller and his pal Joe`
// let doc = nlp(txt)
// console.log(doc.document[0][3].id)
// doc.ptrs = [[0, 3, 5, doc.document[0][3].id]]
// console.log(doc)
// console.log(doc.docs)
// let m = doc.match('#Person+')//.debug()
// console.log(m)
// m.debug()

// let doc = nlp('five hundred fifty nine is more than fifty')
// doc.values().toNumber()
// doc.debug()


// let doc = nlp(`yeah. one extra two match here three`)
// let m = doc.match('match here')
// doc.remove('extra')
// m.docs
// doc.match(m).debug()
// doc.debug()

// let doc = nlp('buy')
// console.log(doc.verbs().conjugate())

let doc = nlp(`extra. match.`)
let m = doc.match('match')
doc.remove('extra')
doc.remove(m)
doc.debug()

// let doc = nlp('once told me')
// let m = doc.match('once')
// doc.insertBefore('somebody')
// m.debug()
// 'once'


