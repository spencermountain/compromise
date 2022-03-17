import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/reindex] '

let txt = `
You'll be making radical changes in your work habits, but you'll be a lot happier for it, and in the end you'll know it was worth it.
Pursuing a successful career, along with the usual social and financial advantages, will be easier this year than it has in a long time for you, Leo!
The most difficult thing might be deciding which path means the most to you, and where to put your focus.
You'll be able to create opportunities for advancement almost out of thin air.
sentence match four.
Romance in 2005 will make it a year to remember - and you'll be the envy of all your friends.
Your working life might not go so smoothly this year, Virgo.
`
test('sanity-check index:', function (t) {
  let doc = nlp(txt)
  let json = doc.json()
  // t.equal(json[4].text, 'sentence number four.', 'got sentence')
  t.deepEqual(json[4].terms[0].index, [4, 0], here + 'got term 1')
  t.deepEqual(json[4].terms[2].index, [4, 2], here + 'got term 2')
  t.end()
})

test('reindex on remove:', function (t) {
  let doc = nlp(txt)
  doc.remove('match')
  let json = doc.eq(4).json()[0]
  t.equal(json.terms[1].normal, 'four', here + 'removed word')
  t.deepEqual(json.terms[1].index, [4, 1], here + 'reindex after remove word')

  doc.eq(1).remove() //pursuing....
  json = doc.eq(3).json()[0]
  t.equal(json.terms[1].normal, 'four', here + 'removed sentence')
  t.deepEqual(json.terms[1].index, [3, 1], here + 'reindex after remove sentence')
  t.end()
})

test('reindex on insert:', function (t) {
  let doc = nlp(txt)
  doc.match('match').insertAfter('insert')
  let json = doc.eq(4).json()[0]
  t.equal(json.terms[2].normal, 'insert', here + 'inserted word')
  t.deepEqual(json.terms[3].index, [4, 3], here + 'reindex after insert word')
  // test .concat too
  t.end()
})

test('reindex on replace:', function (t) {
  let doc = nlp(txt)
  doc.replace('match', 'replace two')
  let json = doc.eq(4).json()[0]
  t.equal(json.terms[1].normal, 'replace', here + 'replaced word')
  t.deepEqual(json.terms[3].index, [4, 3], here + 'reindex after replaced word')
  t.end()
})

test('reindex on concat:', function (t) {
  let doc = nlp(txt)
  doc.eq(1).concat('this is another sentence')
  let json = doc.eq(5).json()[0]
  t.equal(json.terms[1].normal, 'match', here + 'correct word')
  t.deepEqual(json.terms[1].index, [5, 1], here + 'reindex after concat')
  t.end()
})

// test('reindex on unique:', function (t) {
//   let doc = nlp('one two one two three').terms()
//   doc = doc.unique()
//   t.equal(doc.text(), 'one two three', here+'unique smoketest')
//   let json = doc.json()
//   t.deepEqual(json[2].terms[0].index, [2, 0], here+'reindex after unique')
//   t.end()
// })