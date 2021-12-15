/* eslint-disable no-console, no-unused-vars */
import nlp from './src/two.js'
// import plg from './plugins/speech/src/plugin.js'
// nlp.plugin(plg)
// import nlp from './builds/three/compromise-three.cjs'
// nlp.verbose('tagger')

let txt = `I’m `


let doc = nlp(txt)
console.log(doc.text())
// nlp.tokenize('i am').debug()
// doc.replace('walked', 'set up')
// doc.insertAfter('woo')
let arr = doc.json({ text: false })
console.dir(arr, { depth: 5 })
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
