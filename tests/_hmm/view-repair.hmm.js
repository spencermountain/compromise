import test from 'tape'
import nlp from '../01-one/lib.js'
const here = '[hmm/view-repair] '

// If a view's last term is replaced, its end-id can't be found, and the view stretches
// to the end of the sentence. Whole-sentence views rely on this, so a fix has to tell
// them apart from partial views. These lines fail today.
test(here + 'replacing the last term of a partial view', t => {
  let doc = nlp('zero one two three four')
  let view = doc.match('one two three')
  doc.match('three').replaceWith('x')
  t.equal(view.text(), 'one two x', here + 'does not reach the next word')

  // this deletes text
  view.replaceWith('new')
  t.equal(doc.text(), 'zero new four', here + 'replacing it keeps the next word')

  doc = nlp('zero one two three four')
  view = doc.match('one two three')
  doc.match('three').replaceWith('x')
  view.remove()
  t.equal(doc.text(), 'zero four', here + 'removing it keeps the next word')
  t.end()
})

test(here + 'a view with two parts', t => {
  const doc = nlp('zero one two three four five')
  const view = doc.match('(one two|four five)')
  doc.match('two').replaceWith('x y')
  t.deepEqual(view.out('array'), ['one x y', 'four five'], here + 'the parts stay apart')
  t.end()
})
