/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')

let txt = ''
txt = '12µs'
let doc = nlp(txt)
doc.debug()
let m = doc.numbers()
m.units().debug()
console.log(m.units().text('root'))
console.log(doc.json()[0].terms)