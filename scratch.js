/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

nlp.verbose('tagger')

let txt = ''
let doc
let m


txt = ` \n  #_22ll`
txt = `-4`
txt = `.com`
doc = nlp(txt)

doc.debug()
console.log(doc.docs[0])
// let json = doc.json()
// t.equal(json[4].text, 'sentence number four.', 'got sentence')
// console.log(json[3])