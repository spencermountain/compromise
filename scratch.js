/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')

let txt = ''
let doc
let m


txt = `it fell out of the bag. (I wasn't fast enough.) Now it's on the floor.`
doc = nlp(txt)

doc.debug()
// let json = doc.json()
// t.equal(json[4].text, 'sentence number four.', 'got sentence')
// console.log(json[3])