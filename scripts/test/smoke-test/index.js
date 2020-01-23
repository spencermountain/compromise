const test = require('tape')
console.log('\n 🎗️  - running smoke-test..\n')

//'sanity-test' the builds
test('main build', function(t) {
  const main = require('../../../builds/compromise.js')
  let doc = main('John and Joe walked to the store')
  t.equal(doc.people().data().length, 2, 'found-people')
  t.equal(doc.verbs().data().length, 1, 'found-verbs')
  t.equal(doc.match('joe walked .').found, true, 'match-statement')
  t.equal(doc.terms(1).text('reduced'), 'and', 'text-out')
  t.equal(doc.match('joe walked .').found, true)
  t.end()
})

test('min build', function(t) {
  const min = require('../../../builds/compromise.min.js')
  let doc = min('John and Joe walked to the store')
  t.equal(doc.people().data().length, 2, 'found-people')
  t.equal(doc.verbs().data().length, 1, 'found-verbs')
  t.equal(doc.match('joe walked .').found, true, 'match-statement')
  t.equal(doc.terms(1).text('reduced'), 'and', 'text-out')
  t.equal(doc.match('joe walked .').found, true)
  t.end()
})

test('tokenize build', function(t) {
  const tokenize = require('../../../builds/compromise-tokenize.js')
  let doc = tokenize('John and Joe walked to the store')
  t.equal(doc.people().data().length, 0, 'found-people')
  t.equal(doc.verbs().data().length, 0, 'found-verbs')
  t.equal(doc.match('joe walked .').found, true, 'match-statement')
  t.equal(doc.terms(1).text('reduced'), 'and', 'text-out')
  t.end()
})
