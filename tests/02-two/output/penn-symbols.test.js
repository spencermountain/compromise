import test from 'tape'
import nlp from '../../lib/two.js'
const here = '[two/output/penn-symbols] '

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
