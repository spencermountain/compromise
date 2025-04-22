import test from 'tape'
import nlp from './_lib.js'
const here = '[three/miss] '

const arr = [
  ['Canada', '<Verb>'],
  ['Canada Legislative Center', '<Verb>'],
  ['Canada Legislative Center', '<Conjunction>'],
  ['Canada Legislative Center', '<foobar>'],
  // three missing basic
  ['i walked to the store', '<Verb> <Noun> <Verb>'],
  ['i walked to the store', '<Noun> <Adjective>'],
  // adverb, no verb
  // ['about 20 minutes relatively quietly', '<Verb>'],
  // ['quite suddenly', '<Verb>'],
  // adjective moves around
  // ['Australia is the most diverse country', '{Adjective} is <Noun>'],
  // ['Australia is the most diverse country', '<Noun> is <Noun>'],
  // ['Australia is the most diverse country', '<Noun> is <Verb>'],
  // ['Australia is the most diverse country', '<Noun> {Adjective}'], //missing verb-phrase
]

test('no-match:', function (t) {
  arr.forEach(function (a) {
    const doc = nlp(a[0])
    const msg = `'${(a[0] + "' ").padEnd(20, '.')}  - '${a[1]}'`
    t.equal(doc.has(a[1]), false, here + msg)
  })
  t.end()
})
