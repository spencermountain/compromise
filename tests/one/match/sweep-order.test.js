import test from 'tape'
import nlp from '../_lib.js'

test('sweep preserves hook order independently of input order', t => {
  const net = nlp.buildNet([
    { match: 'alpha', reason: 'alpha' },
    { match: 'beta alpha', reason: 'both' },
    { match: 'beta', reason: 'beta' },
    { match: '.', reason: 'always' },
  ])
  const doc = nlp('beta alpha')
  const reasons = options => doc.sweep(net, options).found.map(r => r.reason)
  t.deepEqual(reasons(), ['alpha', 'both', 'beta', 'always', 'always'], 'deduplicate shared hooks and append unindexed rules')
  t.deepEqual(reasons({ matchOne: true }), ['alpha'], 'first match still follows hook order')
  delete net.hookOrder
  t.deepEqual(reasons(), ['alpha', 'both', 'beta', 'always', 'always'], 'older compiled nets retain the same ordering')
  t.end()
})

test('sweep preserves numeric hook enumeration', t => {
  const net = nlp.buildNet([{ match: '10' }, { match: '2' }])
  const result = nlp('10 2').sweep(net)
  t.deepEqual(result.found.map(r => r.match), ['2', '10'], 'numeric keys keep their original enumeration order')
  t.end()
})

test('serialized hook order ignores inherited property names', t => {
  const net = JSON.parse(JSON.stringify(nlp.buildNet([{ match: 'alpha' }])))
  const result = nlp('constructor alpha').sweep(net)
  t.deepEqual(result.found.map(r => r.match), ['alpha'], 'only compiled hook keys are candidates')
  t.end()
})

test('sweep combines candidate filters without losing alternatives', t => {
  const net = nlp.buildNet([
    { match: 'one two', reason: 'required' },
    { match: 'one', ifNo: 'two', reason: 'blocked' },
    { match: '(one|three) (two|four)', reason: 'alternatives' },
    { match: 'one two three', reason: 'too-long' },
    { match: '.', reason: 'unindexed' },
    { match: '. . .', reason: 'unindexed-too-long' },
  ])
  const result = nlp('one two').sweep(net)
  t.deepEqual(result.found.map(r => r.reason), ['required', 'alternatives', 'unindexed', 'unindexed'], 'required words, exclusions, alternatives, and lengths')
  t.end()
})

test('compiled match minimum agrees with uncached matching', t => {
  const net = nlp.buildNet([{ match: 'one? !three [two]', group: 0 }])
  const doc = nlp('one four two')
  const compiled = doc.sweep(net).view.out('array')
  const rules = new Set(Object.values(net.hooks).flat())
  rules.forEach(rule => { delete rule.minLength })
  t.deepEqual(compiled, ['two'], 'optional and negative tokens with a capture')
  t.deepEqual(doc.sweep(net).view.out('array'), compiled, 'older rules calculate the same minimum')
  const parsed = nlp.parseMatch('one two')
  t.equal(nlp('two').has(parsed), false, 'original parsed pattern needs two terms')
  parsed.shift()
  t.equal(nlp('two').has(parsed), true, 'editing public parsed patterns does not leave stale metadata')
  t.end()
})
