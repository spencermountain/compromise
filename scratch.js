/* eslint-disable no-console, no-unused-vars */
import nlp from './src/two.js'
// import plg from './plugins/speech/src/plugin.js'
// nlp.plugin(plg)
// import nlp from './builds/three/compromise-three.cjs'
// nlp.verbose('tagger')

let txt = 'ok cool'


let doc = nlp(txt)
let arr = doc.json({ text: false })


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
