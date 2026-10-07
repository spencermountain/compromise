import test from 'tape'
import nlp from '../../lib/one.js'
const here = '[one/tokenize/slash] '

test('slash whitespace', t => {
  const cases = [
    'left his / her backpack ',
    'left   his/her  backpack ',
    'left  his  /  her  backpack',
  ]
  cases.forEach(input => {
    t.equal(nlp(input).out(), input, here + `preserves whitespace: ${input}`)
  })
  t.end()
})

test('slash match', t => {
  const cases = [
    ['left his / her backpack ', ['his', 'her']],
    ['left   his/her  backpack ', ['his', 'her', 'his/her']],
    ['left  his  /  her  backpack', ['his', 'her']],
    ['left   his/her/their  backpack ', ['his', 'her', 'their', 'his/her/their']],
  ]
  cases.forEach(([input, patterns]) => {
    const doc = nlp(input)
    patterns.forEach(pattern => {
      t.equal(doc.has(pattern), true, here + `${input}: ${pattern}`)
    })
  })
  // Pending: matching 'his / her' across split terms and the SlashedTerm tag.
  t.end()
})
