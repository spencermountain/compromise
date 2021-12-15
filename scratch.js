/* eslint-disable no-console, no-unused-vars */
import nlp from './src/one.js'
// import plg from './plugins/speech/src/plugin.js'
// nlp.plugin(plg)
// import nlp from './builds/three/compromise-three.cjs'
// nlp.verbose('tagger')

let txt = ''


/*
* replace ‘$1’ stuff  [1](https://github.com/spencermountain/compromise/issues/863)
* replace.ignore tests
*/

let doc = nlp('i was saying boo-urns')
console.dir(doc.json(), { depth: 5 })
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
