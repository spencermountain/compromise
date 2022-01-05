/* eslint-disable no-console, no-unused-vars */
import nlp from './src/one.js'
// import plg from './plugins/speech/src/plugin.js'
// nlp.plugin(plg)
// import nlp from './builds/three/compromise-three.cjs'
// nlp.verbose('tagger')

let doc = nlp(`extra. match`)
let m = doc.match('match').freeze()
doc.remove('extra')
m.fullPointer
console.log(m)
m.debug()

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




prepDFS

*/
