/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/speech/src/plugin.js'
// nlp.plugin(plg)
// import nlp from './builds/three/compromise-three.cjs'
// nlp.verbose('tagger')




// let txt = `i was overthrown`
let txt = ''
txt = `he is walking`
txt = `he disrupted`
txt = `I can tell`
let doc = nlp(txt)
// doc.verbs().toPastTense()
// doc.verbs().toPresentTense()
// doc.verbs().toInfinitive()
// doc.verbs().toFuture()
doc.debug()
// console.log(doc.verbs().conjugate())

// let txt = `i walked quickly`
// let doc = nlp(txt)
// let m = doc.match('quickly')
// m.freeze()
// doc.replace('walked', 'set up')
// doc.replace('set', 'really walked')
// m.debug()
// console.log(doc.text())
// doc.insertAfter('woo')
// let arr = doc.json({ text: false })
// console.dir(arr, { depth: 5 })


/*


[
  [1, 2, 3, 4],
  [1, 2, 3],
  [1, 2, 3, 4],
]

.freeze()
[
  [],
]






*/
