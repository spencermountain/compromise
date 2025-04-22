import test from 'tape'
import nlp from './_lib.js'
const here = '[three/topics] '

test('topics:', function (t) {
  const list = [
    ['Tony Hawk lives in Toronto. Tony Hawk is cool.', 'tony hawk'],
    ['I live Toronto. I think Toronto is cool.', 'toronto'],
    ['The EACD united in 1972. EACD must follow regulations.', 'eacd'],
    // ['The Elkjsdflkjsdf sells hamburgers. I think the Elkjsdflkjsdf eats turky.', 'elkjsdflkjsdf'],
    // ["Toronto's citizens love toronto!", 'toronto'],
    ["Toronto's citizens love toronto", 'toronto'],
  ]
  list.forEach(function (a) {
    const arr = nlp(a[0]).topics().out('freq')
    t.equal(arr[0].normal, a[1], here + a[0])
  })
  t.end()
})

test('topics-false-positives:', function (t) {
  const arr = [
    'somone ate her lunch',
    'everybody is dancing all night',
    "a man and a woman ate her son's breakfast",
    'my brother walks to school',
    `She's coming by`,
    `if she doesn't like something about    us she can keep us off`,
    ` She's it! She could be a soap opera.`,
    `she's a little dare-devil!`,
  ]
  arr.forEach(function (str, i) {
    const doc = nlp(str).topics()
    t.equal(doc.length, 0, here + ' #' + i + ' -> ' + doc.out())
  })
  t.end()
})

test('topics-basic', function (t) {
  const doc = nlp('i went to Gloop University in Paris, France, with John H. Smith')
  const arr = doc.topics().out('array')
  // t.deepEqual(arr, ['Gloop University', 'Paris, France,', 'John H. Smith'], here + 'found all three')
  t.equal(arr.length, 3, here + 'found all three')
  t.end()
})

test('misc entities', function (t) {
  const doc = nlp('The Children are right to laugh at you, Ralph')
  let m = doc.people()
  t.equal(m.length, 1, here + 'one person')

  m = doc.places()
  t.equal(m.length, 0, here + 'no places')

  m = doc.organizations()
  t.equal(m.length, 0, here + 'no organizations')

  m = doc.topics()
  t.equal(m.length, 1, here + 'one entity')
  t.end()
})

test('topics concat:', function (t) {
  const things = nlp('spencer and danny are in Paris France and germany for Google Inc and IBM')
    .topics()
    .json({ normal: true, trim: true })
    .map(o => o.normal)
  const want = ['spencer', 'danny', 'paris france', 'germany', 'google inc', 'ibm']
  // t.equal(things.join(', '), want.join(', '), here + 'found right things')
  t.equal(things.length, want.length, here + 'found right things')
  t.end()
})
