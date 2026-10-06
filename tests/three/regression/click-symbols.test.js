import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/regression/click-symbols] '

test(here + 'clicking button labels', t => {
  for (const label of ['submit', 'save', 'cancel', '"submit"']) {
    const doc = nlp(`the user clicks ${label}.`)
    doc.sentences().toPastTense()
    t.equal(doc.text(), `the user clicked ${label}.`, label)
  }
  for (const [input, expected] of [
    ['I click submit.', 'I clicked submit.'],
    ['the user clicks the submit button.', 'the user clicked the submit button.'],
    ['two clicks register.', 'two clicks registered.'],
    ['the button clicks shut.', 'the button clicked shut.'],
  ]) {
    t.equal(nlp(input).sentences().toPastTense().text(), expected, input)
  }
  t.end()
})

test(here + 'Penn standalone symbols', t => {
  for (const symbol of ['/', '*', '+', '=']) {
    t.equal(nlp(symbol).compute('penn').termList()[0].penn, 'SYM', symbol)
  }
  t.equal(nlp('$').compute('penn').termList()[0].penn, '$', 'dollar symbol')
  t.equal(nlp('£').compute('penn').termList()[0].penn, '#', 'pound symbol')
  t.equal(nlp('&').compute('penn').termList()[0].penn, 'CC', 'keep conjunction')
  for (const money of ['$5', '£20']) {
    t.equal(nlp(money).compute('penn').termList()[0].penn, 'CD', money)
  }
  t.deepEqual(
    nlp('2 + 2 = 4')
      .compute('penn')
      .termList()
      .map(term => term.penn),
    ['CD', 'SYM', 'CD', 'SYM', 'CD'],
    'equation'
  )
  t.equal(nlp('hello!').compute('penn').termList()[0].penn, 'UH', 'ignore attached punctuation')
  t.end()
})
