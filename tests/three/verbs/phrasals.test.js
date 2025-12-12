import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/phrasals]'

test('get phrasal infinitive', function (t) {
  const arr = [
    [` running out`, 'run out'],
    [`we walked in`, 'walk in'],
    [`then they quickly walked out`, 'walk out'],
    [`they studied up for the test`, 'study up'],
    [`they studied-up for the test`, 'study up'],
    [`they sat down for the test`, 'sit down'],
  ]
  arr.forEach(a => {
    const doc = nlp(a[0])
    const res = doc.verbs().json()[0].verb
    t.equal(res.infinitive, a[1], here + ` '${a[0]}'`)
  })
  t.end()
})