/* eslint-disable no-console, no-unused-vars */
import nlp from './src/two.js'
// import plg from './plugins/speech/src/plugin.js'
// nlp.plugin(plg)
// import nlp from './builds/three/compromise-three.cjs'
// nlp.verbose('tagger')

import corpus from 'nlp-corpus'

let txt = 'ok cool'


let doc = nlp(txt)
let arr = doc.json({ text: false })
console.log(arr)
// let all = {}
// let dupes = 0
// arr.forEach(o => {
//   o.terms.forEach(term => {
//     // console.log(term.id)
//     if (term.id && all[term.id] === true) {
//       console.log('dupe', term.id)
//       dupes += 1
//     }
//     all[term.id] = true
//     // console.log(term.id)
//   })
// })
// console.log('dupes:', dupes)
// let end = new Date()
// console.log((end.getTime() - begin.getTime()) / 1000, ' seconds')
// console.dir(doc.json(), { depth: 5 })
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
