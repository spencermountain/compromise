/* eslint-disable no-console */
import test from 'tape'
import main from '../../builds/compromise.cjs'
import min from '../../builds/compromise.mjs'
import tokenize from '../../builds/one/compromise-one.cjs'
console.log('\n 🎗️  - running smoke-test..\n') // eslint-disable-line

//'sanity-test' the builds
test('main build', function (t) {
  let doc = main('John and Joe walked to the store')
  t.equal(doc.people().json().length, 2, 'found-people')
  t.equal(doc.verbs().json().length, 1, 'found-verbs')
  t.equal(doc.match('joe walked .').found, true, 'match-statement')
  t.equal(doc.terms(1).text('reduced'), 'and', 'text-out')
  t.equal(doc.match('joe walked .').found, true)
  t.end()
})

test('min build', function (t) {
  let doc = min('John and Joe walked to the store')
  t.equal(doc.people().json().length, 2, 'found-people')
  t.equal(doc.verbs().json().length, 1, 'found-verbs')
  t.equal(doc.match('joe walked .').found, true, 'match-statement')
  t.equal(doc.terms(1).text('reduced'), 'and', 'text-out')
  t.equal(doc.match('joe walked .').found, true)
  t.end()
})

test('tokenize build', function (t) {
  let doc = tokenize('John and Joe walked to the store')
  t.equal(doc.match('joe walked .').found, true, 'match-statement')
  t.equal(doc.terms(1).text('reduced'), 'and', 'text-out')
  //ensure lexicon works
  // let tmp = tokenize('spencer kelly', { spencer: 'Cool' })
  // t.equal(tmp.match('#Cool').text(), 'spencer', 'lexicon-works')
  t.end()
})
