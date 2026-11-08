import test from 'tape'
import nlp from './_lib.js'
const here = '[paragraph/empty] '

const str = 'One cat. Two dogs.\n\nThree birds.'

// every route to a selection with no paragraphs
const empties = () => {
  const doc = nlp(str).paragraphs()
  return {
    'empty-doc': nlp('').paragraphs(),
    'if': doc.if('zebra'),
    'ifNo': doc.ifNo('.'),
    'filter': doc.filter(p => p.has('zebra')),
    'eq': doc.eq(9),
    'first': doc.if('zebra').first(),
    'last': doc.if('zebra').last(),
  }
}

test('empty-to-view', function (t) {
  Object.entries(empties()).forEach(([name, ps]) => {
    const res = {
      match: () => ps.match('cat'),
      not: () => ps.not('cat'),
      sentences: () => ps.sentences(),
      terms: () => ps.terms(),
    }
    Object.entries(res).forEach(([method, fn]) => {
      t.doesNotThrow(fn, here + `${name}: ${method} is safe`)
      t.equal(fn().found, false, here + `${name}: ${method} is empty`)
      t.equal(fn().text(), '', here + `${name}: ${method} has no text`)
    })
  })
  t.end()
})

test('empty-result-is-a-view', function (t) {
  const m = nlp(str).paragraphs().if('zebra').sentences()
  t.equal(m.length, 0, here + 'no sentences')
  // an empty selection must not fall back to the whole document
  t.equal(m.match('cat').found, false, here + 'chained match stays empty')
  t.equal(m.has('cat'), false, here + 'chained has stays empty')
  t.equal(m.terms().length, 0, here + 'chained terms stay empty')
  // but it can still get back to its document
  t.equal(m.all().text(), str, here + 'keeps its document')
  t.end()
})

test('empty-paragraph-methods', function (t) {
  Object.entries(empties()).forEach(([name, ps]) => {
    t.equal(ps.found, false, here + `${name}: not found`)
    t.equal(ps.length, 0, here + `${name}: no length`)
    t.equal(ps.text(), '', here + `${name}: no text`)
    t.deepEqual(ps.json(), [], here + `${name}: no json`)
    t.equal(ps.has('cat'), false, here + `${name}: has`)

    let calls = 0
    ps.forEach(() => {
      calls += 1
    })
    ps.map(p => {
      calls += 1
      return p
    })
    t.equal(calls, 0, here + `${name}: loops never run`)

    // still a Paragraphs object, that can chain into the crash-prone methods
    const chained = {
      if: ps.if('cat'),
      ifNo: ps.ifNo('cat'),
      filter: ps.filter(p => p.has('cat')),
      map: ps.map(p => p),
      eq: ps.eq(0),
      first: ps.first(),
      last: ps.last(),
    }
    Object.entries(chained).forEach(([method, res]) => {
      t.equal(res.viewType, 'Paragraphs', here + `${name}: ${method} type`)
      t.equal(res.found, false, here + `${name}: ${method} is empty`)
      t.equal(res.sentences().found, false, here + `${name}: ${method} then sentences`)
    })
  })
  t.end()
})
