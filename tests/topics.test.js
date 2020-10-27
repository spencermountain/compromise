const test = require('tape')
const nlp = require('./_lib')

test('topics:', function (t) {
  let list = [
    ['Tony Hawk lives in Toronto. Tony Hawk is cool.', 'tony hawk'],
    ['I live Toronto. I think Toronto is cool.', 'toronto'],
    ['The EACD united in 1972. EACD must follow regulations.', 'eacd'],
    // ['The Elkjsdflkjsdf sells hamburgers. I think the Elkjsdflkjsdf eats turky.', 'elkjsdflkjsdf'],
    ["Toronto's citizens love toronto!", 'toronto'],
  ]
  list.forEach(function (a) {
    const arr = nlp(a[0]).topics().out('freq')
    t.equal(arr[0].reduced, a[1], a[0])
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
    t.equal(doc.length, 0, 'topics #' + i + ' -> ' + doc.out())
  })
  t.end()
})

test('topics-basic', function (t) {
  let doc = nlp('i went to Gloop University in Paris, France, with John H. Smith')
  let arr = doc.topics().out('array')
  t.deepEqual(arr, ['Gloop University', 'Paris, France,', 'John H. Smith'], 'found all three topics')
  t.end()
})

test('misc entities', function (t) {
  let doc = nlp('The Children are right to laugh at you, Ralph')
  let m = doc.people()
  t.equal(m.length, 1, 'one person')

  m = doc.places()
  t.equal(m.length, 0, 'no places')

  m = doc.organizations()
  t.equal(m.length, 0, 'no organizations')

  m = doc.entities()
  t.equal(m.length, 1, 'one entity')
  t.end()
})

test('topics concat:', function (t) {
  const things = nlp('spencer and danny are in Paris France and germany for Google Inc and IBM')
    .topics()
    .json({ normal: true, trim: true })
    .map(o => o.normal)
  const want = ['spencer', 'danny', 'paris france', 'germany', 'google inc', 'ibm']
  t.equal(things.join(', '), want.join(', '), 'found right things')
  t.end()
})
