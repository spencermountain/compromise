const test = require('tape')
const nlp = require('../_lib')

test('toParticiple', function (t) {
  let arr = [
    ['i drive', 'i have driven'],
    ['we smoke', 'we have smoked'],
    ['i will go', 'i will have gone'], //still future-tense
    ['they all swim', 'they all have swam'],
    ['i learn', 'i have learned'],
    ['i really travel to india', 'i really have traveled to india'],
  ]
  arr.forEach(a => {
    let doc = nlp(a[0])
    doc.verbs().toParticiple()
    t.equal(doc.text(), a[1], a[0])
  })
  t.end()
})
