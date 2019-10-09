const test = require('tape')
const nlp = require('../../../tests/_lib')

test('people:', function(t) {
  let doc = nlp('Mary is in the boat. Nancy is in the boat. Fred is in the boat. Jack is too.')
  let arr = doc
    .people()
    .toLowerCase()
    .out('array')
  t.deepEqual(arr, ['mary', 'nancy', 'fred', 'jack'], 'people-easy')

  doc = nlp('jean jacket. jean Slkje')
  arr = doc
    .people()
    .toLowerCase()
    .out('array')
  t.deepEqual(arr, ['jean slkje'], 'people-context')

  doc = nlp('The Bill was passed by James MacCarthur')
  arr = doc
    .people()
    .toLowerCase()
    .out('array')
  t.deepEqual(arr, ['james maccarthur'], 'the-bill')

  doc = nlp('Rod MacDonald bought a Rod')
  arr = doc
    .people()
    .toLowerCase()
    .out('array')
  t.deepEqual(arr, ['rod macdonald'], 'the-rod-1')

  doc = nlp('Rod L. MacDonald bought a lightening rod')
  arr = doc
    .people()
    .toLowerCase()
    .out('text')
  t.deepEqual(arr, 'rod l. macdonald', 'the-rod-2')

  doc = nlp("Matt 'the doctor' Smith lasted three seasons.")
  arr = doc
    .people()
    .toLowerCase()
    .out()
  t.deepEqual(arr, "matt 'the doctor' smith", 'nickname-1')

  doc = nlp("Randal Kieth Orton and Dwayne 'the rock' Johnson had a really funny fight.")
  t.equal(doc.people(0).out('normal'), 'randal kieth orton', 'nickname-2a')
  t.equal(doc.people(1).out('normal'), 'dwayne the rock johnson', 'nickname-2b')

  t.end()
})
