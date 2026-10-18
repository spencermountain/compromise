import test from 'tape'
import nlp from '../../lib/one.js'
const here = '[one/output/frequency] '

test(here + 'dictionary keys in frequency counts', t => {
  const doc = nlp('apple constructor constructor pear')
  t.deepEqual(
    doc.terms().out('freq'),
    [
      { normal: 'constructor', count: 2 },
      { normal: 'apple', count: 1 },
      { normal: 'pear', count: 1 },
    ],
    'counts inherited names and sorts descending with stable ties'
  )
  doc.compute('freq')
  t.deepEqual(
    doc.termList().map(term => term.freq),
    [1, 2, 2, 1],
    'term frequencies stay numeric'
  )
  t.deepEqual(
    doc.terms().sort('freq').out('array'),
    ['constructor', 'constructor', 'apple', 'pear'],
    'frequency sorting handles inherited names'
  )
  t.end()
})
