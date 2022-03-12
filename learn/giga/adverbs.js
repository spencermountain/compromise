/* eslint-disable no-console, no-unused-vars */
import doDocs from './_giga.js'
import tagMap from './_tagMap.js'
import transform from '../../src/2-two/preTagger/methods/transform/adverbs.js'


let ids = []
for (let i = 1; i <= 10; i += 1) {
  let str = String(i).padStart(4, '0')
  ids.push(str)
}
ids = ['0004']

let jjs = []
let rbs = []

const doSentence = function (s) {
  s.w = s.w || []
  s.w.forEach(t => {
    let tag = tagMap[t['$'].tree]
    if (tag === 'Adverb') {
      rbs.push(t['$'].lem)
    }
    if (tag === 'Adjective') {
      jjs.push(t['$'].lem)
    }
  })
}

let correct = 0
doDocs(ids, doSentence).then(() => {
  jjs = new Set(jjs)
  rbs.forEach(rb => {
    rb = rb || ''
    let j = transform(rb)
    if (rb.endsWith('ly') && !jjs.has(j)) {
      console.log(rb)
    } else {
      correct += 1
    }
  })
  console.log(correct.toLocaleString(), rbs.length.toLocaleString())
})
