import test from 'tape'
import nlp from '../_lib.js'
const here = '[dates/tagger/text-preservation] '

test(here + 'tagger does not mutate text', function (t) {
  const arr = ['in a hour', 'in an hour', 'jan and tues the third', 'tmrw the second', 'JAN and WeD']
  arr.forEach((str) => {
    const doc = nlp(str)
    doc.dates()
    t.equal(doc.text(), str, str)
  })
  t.end()
})
