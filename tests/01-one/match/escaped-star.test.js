import test from 'tape'
import nlp from '../lib.js'
const here = '[one/match/escaped-star] '

const first = str => nlp.parseMatch(str)[0]

test('an escaped star is not a repeat', function (t) {
  const arr = [
    ['big\\*', 'big*'],
    ['\\*', '*'],
    ['big\\+', 'big+'],
    ['\\+', '+'],
  ]
  arr.forEach(([str, word]) => {
    const reg = first(str)
    t.equal(reg.word, word, here + `word: ${str}`)
    t.notOk(reg.greedy, here + `not greedy: ${str}`)
    t.notOk(reg.optional, here + `not optional: ${str}`)
  })
  t.end()
})

test('an escaped star needs its term', function (t) {
  t.deepEqual(nlp('the dogs').match('the big\\* dogs').out('array'), [], here + 'not optional')
  t.deepEqual(nlp('the big dogs').match('the big\\* dogs').out('array'), [], here + 'is not the word')
  t.deepEqual(nlp('a * b').match('\\*').out('array'), [], here + 'bare star')
  t.end()
})

// and the real ones keep working
test('an unescaped star is a repeat', function (t) {
  const arr = [
    ['big*', { greedy: true, optional: true, word: 'big' }],
    ['#Noun*', { greedy: true, optional: true, tag: 'Noun' }],
    ['big+', { greedy: true, word: 'big' }],
  ]
  arr.forEach(([str, want]) => {
    t.deepEqual(first(str), want, here + str)
  })
  t.deepEqual(first('*'), { anything: true, greedy: true, optional: true }, here + 'wildcard')
  t.deepEqual(nlp('the dogs').match('the big* dogs').out('array'), ['the dogs'], here + 'zero')
  t.deepEqual(nlp('the big big dogs').match('the big* dogs').out('array'), ['the big big dogs'], here + 'many')
  t.end()
})
