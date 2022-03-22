import test from 'tape'
import nlp from './_lib.js'
const here = '[three/match] '

let arr = [
  // one still works
  ['toronto', '.'],
  // two still works
  ['mexico', '#Country'],
  // three-basic
  // ['i walked to the store', '<Noun> {Verb} {Conjunction} <Noun>'],
  // adj must have copula
  // ['Australia is the most diverse country', '<Noun> is {Adjective}'],
  // ['the most diverse country is the best', '<Noun> is <Noun>'],

  // [`Look at that old woman`,''],
  // [`She lived in New York at that time.`,''],
  // [`Where is that friend of yours?`,''],
  // [ `He said that he was hungry.`,''],
  // [ `I bought the materials that are required`,''],
]
test('match:', function (t) {
  arr.forEach(function (a) {
    let doc = nlp(a[0])
    let msg = `'${(a[0] + "' ").padEnd(20, '.')}  - '${a[1]}'`
    let m = doc.match(a[1])
    t.equal(m.text(), doc.text(), here + msg)
  })
  t.end()
})
