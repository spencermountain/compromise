import test from 'tape'
import nlp from '../lib.js'
const here = '[one/misc/pointer-start-repair] '

// a selection whose first term is replaced, before it is used
const replaced = (str = 'x') => {
  const doc = nlp('zero one two three four')
  const view = doc.match('one two three')
  doc.match('one').replaceWith(str)
  return { doc, view }
}

test(here + 'a replaced start-term keeps the selection in place', t => {
  let { view } = replaced()
  t.equal(view.text(), 'x two three', 'same length')
  t.deepEqual(view.fullPointer[0].slice(0, 3), [0, 1, 4], 'same pointer')
  t.equal(view.text(), 'x two three', 'text is stable')

  view = replaced('x y').view
  t.equal(view.text(), 'x y two three', 'grown')
  t.deepEqual(view.fullPointer[0].slice(0, 3), [0, 1, 5], 'grown pointer')
  t.end()
})

test(here + 'matches inside the repaired selection line up', t => {
  const { view } = replaced()
  const m = view.match('[<a>x] [<b>two] [<c>three]')
  t.equal(m.groups('a').text(), 'x', 'first group')
  t.equal(m.groups('b').text(), 'two', 'second group')
  t.equal(m.groups('c').text(), 'three', 'third group')
  t.equal(view.match('zero').found, false, 'does not grow backwards')
  t.end()
})

test(here + 'a cloned sub-view survives replacing its first term', t => {
  const view = nlp('the second half of June 2027').match('second half of June 2027').clone()
  view.match('second').replaceWith('2nd')
  t.equal(view.text(), '2nd half of June 2027', 'text')
  const g = view.match('[<part>2nd] half of [<month>june] [<year>2027]').groups()
  t.equal(g.part.text(), '2nd', 'part group')
  t.equal(g.month.text(), 'June', 'month group')
  t.equal(g.year.text(), '2027', 'year group')
  t.end()
})
