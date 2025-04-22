import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/sweep] '

test('sweep-basic:', function (t) {
  const matches = [
    { match: '2nd quarter of? 2022', tag: 'TimePeriod' },
    { match: '(from|by|before) now', tag: 'FooBar' },
  ]
  const net = nlp.buildNet(matches)

  const doc = nlp(`so good by now. woo hoo before now. in the 2nd quarter 2022`)
  const { view, found } = doc.sweep(net)

  t.equal(view.length, 3, here + 'view has three')
  t.equal(found.length, 3, here + 'found three')

  const m = view.match('#TimePeriod')
  t.equal(m.text(), '2nd quarter 2022', here + 'tag sweep')

  t.equal(found[0].view.text(), 'by now', here + 'found view')

  t.end()
})


test('match-net-basic:', function (t) {
  const matches = [
    { match: 'john c .', tag: 'Actor' },
    { match: 'john foo', tag: 'FooBar' },
    { match: 'john . reilly', tag: 'SecondTag' },
  ]
  const net = nlp.buildNet(matches)

  let doc = nlp(`he was john c reilly. oh yeah`)

  // return after the first match
  const { view, found } = doc.sweep(net, { tagger: false, matchOne: true })
  t.equal(view.length, 1, here + 'matchOne')
  found[0] = found[0] || {}
  t.equal(found[0].match, 'john c .', here + 'matchOne-first')

  // .match
  let m = doc.match(net)
  t.equal(m.text(), 'john c reilly', here + 'basic match')
  t.equal(doc.has('(#Actor|#FooBar|#SecondTag)'), false, here + 'match doesnt tag')
  t.equal(m.length, 1, here + 'only one')

  // .has
  t.equal(doc.has(net), true, here + 'has-basic')

  // .if
  m = doc.if(net)
  t.equal(m.text(), 'he was john c reilly.', here + 'if-basic')
  m = doc.ifNo(net)
  t.equal(m.text(), 'oh yeah', here + 'ifNo-basic')


  doc = nlp(`he was john c reilly. oh yeah john b reilly too`)
  m = doc.match(net)
  t.equal(m.length, 2, here + 'only both')
  m = doc.matchOne(net)
  t.equal(m.text(), 'john c reilly', here + 'matchOne')

  t.end()
})

test('un-cacheable-match:', function (t) {
  let matches = [
    { match: '/[0-9]{1,2}(st|nd|rd|th)/', tag: 'RegExp' },
  ]
  let net = nlp.buildNet(matches)
  let m = nlp('foo 2nd bar').sweep(net).view
  t.equal(m.has('#RegExp'), true, here + 'found regex-only')

  matches = [{ match: '/foo/' }]
  net = nlp.buildNet(matches)
  m = nlp('first. foo bar').sweep(net).view
  t.equal(m.text(), 'foo', here + 'found reg')
  t.end()
})

test('cache-checks:', function (t) {
  const net = nlp.buildNet([
    { match: '(will && @isTitleCase) smith', tag: 'Celebrity' }
  ])
  let m = nlp('Will Smith').sweep(net).view
  t.equal(m.has('#Celebrity'), true, here + 'and result found')

  m = nlp('will Smith').sweep(net).view
  t.equal(m.has('#Celebrity'), false, here + 'and true-negative')

  t.end()
})


test('multi-fast-OR:', function (t) {
  const net = nlp.buildNet([
    { match: '(one|two|three) (a|b|c)', tag: 'Found' }
  ])
  const allForms = [
    'one a',
    'one b',
    'one c',
    'three a',
    'three b',
    'three c',
  ]
  allForms.forEach(reg => {
    const m = nlp(reg).sweep(net).view
    t.equal(m.has('#Found'), true, here + reg)
  })
  t.end()
})

test('slow-OR-checks:', function (t) {
  const net = nlp.buildNet([
    { match: '(foo|one two)', tag: 'Found' }
  ])
  let m = nlp('foo').sweep(net).view
  t.equal(m.has('#Found'), true, here + 'single-choice')

  m = nlp('one two').sweep(net).view
  t.equal(m.has('#Found'), true, here + 'multi-choice')

  m = nlp('open bar').sweep(net).view
  t.equal(m.has('#Found'), false, here + 'not-one-multi')

  t.end()
})

test('sweep partial document:', function (t) {
  const matches = [
    { match: 'remove .' },
    { match: 'daffy duck' },
  ]
  const net = nlp.buildNet(matches)
  let doc = nlp(`before here. remove this. after here`)
  doc = doc.not('remove this')
  let m = doc.match(net)
  t.equal(m.found, false, here + 'shouldnt find excluded sentence')

  doc = nlp(`before here. remove this. daffy duck after. not this`)
  doc = doc.notIf('remove this')
  m = doc.match(net)
  t.equal(m.text(), 'daffy duck', here + 'match after remove')

  t.end()
})

test('sweep absolute indexes:', function (t) {
  const matches = [
    { match: 'third' },
  ]
  const net = nlp.buildNet(matches)
  let doc = nlp(`first. second. third`)
  doc = doc.reverse()

  const res = doc.sweep(net)
  res.view.soften()
  t.equal(res.view.text(), 'third', here + 'abs index in res')

  res.found[0] = res.found[0] || {}
  res.found[0].view = res.found[0].view || doc.none()
  res.found[0].view.soften()
  t.equal(res.found[0].view.text(), 'third', here + 'abs index in found')
  t.end()
})

test('no negative OR false-matches:', function (t) {
  const txt = 'and us not making appointments'
  const reg = '!(was|us|me) not making appointments'
  const doc = nlp(txt)
  const net = nlp.buildNet([
    { match: reg }
  ])
  t.equal(doc.match(net).found, false, here + 'no negative OR')
  t.end()
})

test('buildNet reserved word safe:', function (t) {
  const matches = [
    { match: 'first' },
    { match: 'constructor' },
  ]
  const net = nlp.buildNet(matches)
  const doc = nlp(`constructor. second`)

  const res = doc.sweep(net)
  t.equal(res.view.text(), 'constructor.', here + 'buildNet reserved word safe')

  t.end()
})
