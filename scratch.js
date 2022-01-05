/* eslint-disable no-console, no-unused-vars */
import nlp from './src/one.js'
// import plg from './plugins/speech/src/plugin.js'
// nlp.plugin(plg)
// import nlp from './builds/three/compromise-three.cjs'
// nlp.verbose('tagger')

let doc = nlp('the boy and the girl.')
// let m = doc.match('(boy|girl)')
doc.intersection('(boy|girl)').debug()
// m.freeze()
// doc.prepend('ooh')
// m.repair()
// m.unfreeze()
// console.log(m)
// console.log(doc.match(m))
// doc.match(m).debug()
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
