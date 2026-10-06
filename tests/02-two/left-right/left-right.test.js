import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/left-right/left-right] '

test(here + 'left/right dates, units and local prepositions: re-tagging', t => {
  const cases = [
    'It costs five bucks.',
    'The board is five feet long.',
    'The park covers three square miles.',
    'We need five gb of storage.',
    'Wait a half second.',
    'We meet on sat.',
    'We meet on wed.',
    'We arrive in March.',
    'We arrive in early May.',
    'They march quickly.',
    'We need some kind of help.',
    'She teaches dance music.',
    'We meet at 5pm eastern.',
    'The plane is right above the clouds.',
    'The boat is directly below the bridge.',
    'They stood just under our balcony.',
    'The bird flew well over them.',
  ]
  cases.forEach(text => {
    const doc = nlp(text)
    const before = doc.docs.flat().map(term => [...term.tags].sort())
    doc.compute('tagger')
    const after = doc.docs.flat().map(term => [...term.tags].sort())
    t.deepEqual(after, before, 'retag: ' + doc.text().trim())
  })
  t.end()
})

test(here + 'migrated tag-based left/right contexts: re-tagging', t => {
  const cases = [
    'a well made table',
    'as entertaining as a movie',
    'more amusing than a movie',
    'very annoying',
    'a blown motor',
    'no doubt',
    'any charge',
    'the above is clear',
    'who he knows',
  ]
  cases.forEach(text => {
    const doc = nlp(text)
    const before = doc.docs.flat().map(term => [...term.tags].sort())
    doc.compute('tagger')
    const after = doc.docs.flat().map(term => [...term.tags].sort())
    t.deepEqual(after, before, 'retag: ' + doc.text().trim())
  })
  t.end()
})

test(here + 'left/right gerund modifier with an incoming Gerund tag', t => {
  const gerund = nlp('the running horse')
  gerund.match('running').tag('Gerund')
  nlp.world().methods.two.leftRight(gerund.docs, gerund.world.model.two.leftRight, gerund.world)
  t.equal(gerund.match('running').has('#Adjective'), true, 'gerund modifier with incoming Gerund tag')
  t.end()
})

test(here + 'more left/right tagging contexts: re-tagging', t => {
  const cases = [
    'They have running water.',
    'It left an enduring legacy.',
    'She is pretty happy.',
    'Even the dog left.',
    'He looks happy.',
    'She sounds happy.',
    'They start singing.',
    'We left right after lunch.',
    'It is always there.',
    'I said sorry.',
    'We flew to Turkey.',
    'Is there any more?',
  ]
  cases.forEach(text => {
    const doc = nlp(text)
    const before = doc.docs.flat().map(term => [...term.tags].sort())
    doc.compute('tagger')
    const after = doc.docs.flat().map(term => [...term.tags].sort())
    t.deepEqual(after, before, 'retag: ' + doc.text().trim())
  })
  t.end()
})

test(here + 'left/right rules in the tagging pipeline: re-tagging', t => {
  const cases = [
    'The said elephant vanished.',
    'She still sings.',
    'The shelf is high enough.',
    'A ticket is a must.',
    'We must march.',
    'She will dance.',
    'They said that she left.',
    'It looks nothing like a cat.',
    'There is plenty of food.',
    'I waited a while.',
  ]
  cases.forEach(text => {
    const doc = nlp(text)
    const before = doc.docs.flat().map(term => [...term.tags].sort())
    doc.compute('tagger')
    const after = doc.docs.flat().map(term => [...term.tags].sort())
    t.deepEqual(after, before, 'retag: ' + doc.text().trim())
  })
  t.end()
})

test(here + 'left/right tagger sketch', t => {
  const run = (doc, rules) => nlp.world().methods.two.leftRight(doc.docs, { byWord: rules, byTag: {} }, doc.world)
  const doc = nlp('my foo and your foo')
  doc.match('foo').tag('Verb')
  run(doc, { foo: [{ pre: 'my', post: '', tag: 'Noun' }] })
  t.equal(doc.match('my #Noun').found, true, 'left literal selects the target')
  t.equal(doc.match('your #Verb').found, true, 'unmatched target stays unchanged')

  const right = nlp('foo bar')
  right.match('foo').tag('Verb')
  right.match('bar').tag('Noun')
  run(right, { foo: [{ post: '#Noun', tag: 'Adjective' }] })
  t.equal(right.match('#Adjective #Noun').found, true, 'right tag condition')

  const boundary = nlp('my. foo')
  boundary.match('foo').tag('Verb')
  run(boundary, { foo: [{ pre: 'my', tag: 'Noun' }] })
  t.equal(boundary.match('foo').has('#Verb'), true, 'does not cross sentences')

  const deferred = nlp('my foo bar')
  deferred.match('foo bar').tag('Verb')
  run(deferred, {
    foo: [{ pre: 'my', tag: 'Noun' }],
    bar: [{ pre: '#Noun', tag: 'Adjective' }],
  })
  t.equal(deferred.match('bar').has('#Verb'), true, 'checks see tags from before the pass')
  run(deferred, { foo: [{ pre: 'my', tag: 'Adjective' }, { pre: 'my', tag: 'Verb' }] })
  t.equal(deferred.match('foo').has('#Verb'), true, 'bucket order resolves conflicting actions')
  t.end()
})
