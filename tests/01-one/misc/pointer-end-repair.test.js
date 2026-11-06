import test from 'tape'
import nlp from '../lib.js'
const here = '[one/misc/pointer-end-repair] '

// a selection whose text grows, shrinks, or shifts, before it is used
const grown = () => {
  const doc = nlp('zero one two three four')
  const view = doc.match('one two three')
  doc.match('two').replaceWith('x y')
  return { doc, view }
}
const shrunk = () => {
  const doc = nlp('zero one two three four')
  const view = doc.match('one two three')
  doc.remove('two')
  return { doc, view }
}
const shifted = () => {
  const doc = nlp('zero one two three four')
  const view = doc.match('one two three')
  doc.match('zero').replaceWith('a b')
  doc.match('two').replaceWith('x y')
  return { doc, view }
}

test(here + 'the repaired pointer is exclusive', t => {
  let { view } = grown()
  t.equal(view.text(), 'one x y three', 'grown text')
  t.deepEqual(view.fullPointer[0].slice(0, 3), [0, 1, 5], 'grown pointer')
  t.equal(view.text(), 'one x y three', 'grown text is stable')

  view = shrunk().view
  t.equal(view.text(), 'one three', 'shrunk text')
  t.deepEqual(view.fullPointer[0].slice(0, 3), [0, 1, 3], 'shrunk pointer')
  t.end()
})

test(here + 'a pointer can read before it is repaired', t => {
  const { view } = grown()
  t.deepEqual(view.fullPointer[0].slice(0, 3), [0, 1, 5], 'unread pointer')
  t.end()
})

test(here + 'a changed view can be replaced', t => {
  let { doc, view } = grown()
  view.replaceWith('new')
  t.equal(doc.text(), 'zero new four', 'grown')

  ;({ doc, view } = grown())
  t.equal(view.text(), 'one x y three', 'read it first')
  view.replaceWith('new')
  t.equal(doc.text(), 'zero new four', 'grown and read')

  ;({ doc, view } = shrunk())
  view.replaceWith('new')
  t.equal(doc.text(), 'zero new four', 'shrunk')

  ;({ doc, view } = shifted())
  view.replaceWith('new')
  t.equal(doc.text(), 'a b new four', 'shifted')
  t.end()
})

test(here + 'a changed view can be removed', t => {
  let { doc, view } = grown()
  doc.remove(view)
  t.equal(doc.text(), 'zero four', 'from the doc')

  ;({ doc, view } = grown())
  view.remove()
  t.equal(doc.text(), 'zero four', 'itself')
  t.end()
})

test(here + 'text goes after a changed view', t => {
  let { doc, view } = grown()
  view.insertAfter('new')
  t.equal(doc.text(), 'zero one x y three new four', 'insertAfter')

  ;({ doc, view } = grown())
  view.append('new')
  t.equal(doc.text(), 'zero one x y three new four', 'append')
  t.equal(view.text(), 'one x y three new', 'append is in the view')
  t.end()
})

test(here + 'the start and the end can both move', t => {
  const { view } = shifted()
  t.equal(view.text(), 'one x y three', 'first read')
  t.equal(view.text(), 'one x y three', 'later read')
  t.deepEqual(view.fullPointer[0].slice(0, 3), [0, 2, 6], 'pointer')

  const doc = nlp('zero one two three four')
  const m = doc.match('one two three')
  doc.match('zero').replaceWith('a b')
  doc.remove('two')
  t.equal(m.text(), 'one three', 'shifted and shrunk')
  t.end()
})

test(here + 'a missing end term', t => {
  // a moved view keeps its length, so that it cannot reach further than before
  let doc = nlp('zero one two three four')
  let view = doc.match('one two three')
  doc.match('zero').replaceWith('a b')
  doc.match('three').replaceWith('x')
  t.equal(view.text(), 'one two x', 'moved view')
  view.replaceWith('new')
  t.equal(doc.text(), 'a b new four', 'moved view, replaced')

  // an unmoved view goes to the end of the sentence
  doc = nlp('zero one two')
  view = doc.match('zero one two')
  doc.match('two').replaceWith('x')
  t.equal(view.text(), 'zero one x', 'whole sentence')
  t.end()
})
