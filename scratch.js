/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/speech/src/plugin.js'
// nlp.plugin(plg)
// import nlp from './builds/three/compromise-three.cjs'
// nlp.verbose('tagger')

let txt = ''


/*
* replace ‘$1’ stuff  [1](https://github.com/spencermountain/compromise/issues/863)
* combine documents
* more .json() methods
* replace.ignore tests
*/



// let doc = nlp(txt)
// doc.debug()


let doc = nlp('the boy and the girl')
doc.replace('the (boy|girl)', 'the cat')
doc.debug()

// doc.debug()
// console.log(doc.json({ dirty: true })[0])
// console.log(doc.json({ syllables: true })[0])
// doc.verbs().toPresent()
// doc.verbs().toNegative()
// doc.debug()
// console.log(doc.text())

// const doc = nlp('Tony on september 12 1998 yeah')
// const doc = nlp('fifty five')
// doc.numbers().toOrdinal()
// doc.debug()
// console.dir(doc.times().json({ terms: false }), { depth: 5 })
// console.dir(doc.dates().json({ terms: false }), { depth: 5 })
// let doc = nlp(txt)
// doc.debug()




/*










*/
