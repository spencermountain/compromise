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


let doc = nlp('it was 500')
doc.replace('500', '500th')
// doc.insertAfter('ooh')
// doc.values().toOrdinal()
doc.debug()

// doc = nlp('once told me')
// m = doc.match('once')
// doc.insertBefore('somebody')
// m.debug()
// console.log(m)
// 'somebody'


