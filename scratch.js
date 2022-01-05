/* eslint-disable no-console, no-unused-vars */
import nlp from './src/one.js'
// import plg from './plugins/speech/src/plugin.js'
// nlp.plugin(plg)
// import nlp from './builds/three/compromise-three.cjs'
// nlp.verbose('tagger')

let doc = nlp('the boy and the girl.')
let m = doc.match('(boy|girl)').freeze()
doc.prepend('ooh baby')
m.repair()
console.log(m)
doc.match(m).debug()
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
