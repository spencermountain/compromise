import test from 'tape'
import nlp from './_lib.js'
const here = '[one/match] '

const arr = [
  ['toronto', 'toronto'],
  ['mexico', '.'],
  ['mexico', '.?'],
  ['mexico city', '.'],
  ['mexico city', '.+'],
  ['mexico city', '.{0,2}'],
  ['mexico city', '.{1,2}'],
  ['mexico city', '.{2,2}'],
  ['mexico city', '.{2}'],
  ['mexico city hall', '.{2,3}'],
  ['mexico city hall', '/mex/? .+'],
  ['mexico', '/mex/'],
  ['mexico', '.{0,3}'],
  ['Please -Match me', 'please match me'],
  ['the -5 runner', 'the -5 runner'],
  ['the -5th runner', 'the -5th runner'],
]
test('match:', function (t) {
  arr.forEach(function (a) {
    const doc = nlp(a[0])
    const msg = `'${(a[0] + "' ").padEnd(20, '.')}  - '${a[1]}'`
    const m = doc.match(a[1])
    t.equal(m.text(), doc.text(), here + msg)
  })
  t.end()
})
