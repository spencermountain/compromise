import test from 'tape'
import nlp from '../../lib/one.js'
const here = '[one/sweep/sweep-always-exclusions] '

test(here + 'unindexed sweep rules respect exclusions', t => {
  const patterns = ['.', '/^house$/', '#Noun?']
  patterns.forEach(match => {
    const net = nlp.buildNet([{ match, ifNo: '#SweepBlocker', tag: 'SweepExcludedMarker' }])
    const blocked = nlp.tokenize('house').tag(['Noun', 'SweepBlocker'])
    t.equal(blocked.sweep(net).found.length, 0, `${match}: excluded sentence does not match`)
    t.notOk(blocked.has('#SweepExcludedMarker'), `${match}: excluded sentence is not tagged`)
    const allowed = nlp.tokenize('house').tag('Noun')
    t.ok(allowed.sweep(net).found.length > 0, `${match}: allowed sentence still matches`)
  })
  t.end()
})

test(here + 'unindexed exclusions preserve ordering and legacy nets', t => {
  const net = nlp.buildNet([
    { match: '.', ifNo: ['house'], reason: 'blocked' },
    { match: 'house', reason: 'indexed' },
    { match: '.', ifNo: ['missing'], reason: 'allowed' },
  ])
  const legacy = { hooks: net.hooks, always: net.always, isNet: true }
  const nets = [net, legacy]
  nets.forEach(compiled => {
    const doc = nlp.tokenize('house')
    t.deepEqual(doc.sweep(compiled).found.map(rule => rule.reason), ['indexed', 'allowed'], 'surviving unindexed rules run last')
    t.deepEqual(doc.sweep(compiled, { matchOne: true }).found.map(rule => rule.reason), ['indexed'], 'first match remains indexed')
  })
  t.end()
})
