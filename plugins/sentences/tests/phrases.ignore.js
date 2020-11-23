const test = require('tape')
const nlp = require('./_lib')
const data = require('./svo-data')
// console.log(data.length)

test('phrases', function (t) {
  data.forEach((o) => {
    let doc = nlp(o.txt)
    let m = doc.match('#NounPhrase+ !#NounPhrase #NounPhrase')
    if (m.found) {
      m = m.eq(0)
      // console.log(m.out('array'))
    }
  })
  t.end()
})
