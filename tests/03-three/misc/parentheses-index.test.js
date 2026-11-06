import test from 'tape'
import nlp from '../lib.js'
const here = '[three/parentheses-index] '

// does every term know where it is?
const isIndexed = doc => {
  return doc.document.every((terms, n) => {
    return terms.every((term, i) => term.index[0] === n && term.index[1] === i)
  })
}

// a contraction in the rewrite adds new terms, before the parentheses
const questions = [
  [`Isn't he happy (again)?`, `Won't he be happy (again)?`, 1],
  [`Don't they walk (often) to work?`, `Won't they walk (often) to work?`, 1],
  [`Haven't you seen (it) today?`, `Won't you have seen (it) today?`, 1],
  [`Wasn't she happy (again)? Isn't he sad (too)?`, `Won't she be happy (again)? Won't he be sad (too)?`, 2],
]

test(here + 'a rewritten question can be parsed again', function (t) {
  questions.forEach(a => {
    const [str, want, count] = a
    const doc = nlp(str)
    doc.sentences().toFutureTense()
    t.equal(doc.text(), want, here + 'text: ' + str)
    t.equal(isIndexed(doc), true, here + 'indexes: ' + str)
    t.equal(doc.sentences().json().length, count, here + 'json: ' + str)
    t.equal(doc.clauses().found, true, here + 'clauses: ' + str)
    t.equal(doc.parentheses().length, count, here + 'parentheses: ' + str)
  })
  t.end()
})

test(here + 'a rewritten question can be converted again', function (t) {
  questions.forEach(a => {
    const doc = nlp(a[0])
    doc.sentences().toFutureTense()
    doc.sentences().toPastTense()
    t.equal(doc.parentheses().length, a[2], here + 'sentences: ' + a[0])

    const verbs = nlp(a[0])
    verbs.verbs().toFutureTense()
    verbs.sentences().toPastTense()
    t.equal(verbs.parentheses().length, a[2], here + 'verbs: ' + a[0])
  })
  t.end()
})

test(here + 'a stale index cannot hang the search', function (t) {
  const doc = nlp('one two (three) four. five (six seven) eight (nine).')
  doc.document.forEach(terms => {
    terms.forEach(term => {
      term.index = [0, 0]
    })
  })
  t.deepEqual(doc.parentheses().out('array'), ['(three)', '(six seven)', '(nine).'], here + 'still found')
  t.end()
})

test(here + 'parentheses in a partial view', function (t) {
  const doc = nlp('one two three (four) (five six) seven')
  const arr = doc.match('four five six').parentheses().out('array')
  t.deepEqual(arr, ['(four)', '(five six)'], here + 'finds each one')
  t.deepEqual(doc.match('five six seven').parentheses().out('array'), ['(five six)'], here + 'end of view')
  t.end()
})

test(here + 'parentheses are otherwise unchanged', function (t) {
  const arr = [
    ['one (two three) four', ['(two three)']],
    ['one (two) three (four) five', ['(two)', '(four)']],
    ['(one two) three', ['(one two)']],
    ['one two (three)', ['(three)']],
    ['one (two three', []],
    ['one two) three', []],
    [`he isn't (really) here`, ['(really)']],
  ]
  arr.forEach(a => {
    t.deepEqual(nlp(a[0]).parentheses().out('array'), a[1], here + a[0])
  })
  t.end()
})
