import test from 'tape'
import nlp from '../../two/_lib.js'

test('sweep checks required sentence boundaries before matching', t => {
  const world = nlp.world()
  const rules = [{ match: '^hello' }, { match: 'world$' }]
  const net = world.methods.one.buildNet(rules, world)
  const doc = nlp('hello world. world hello.')
  const original = world.methods.one.match
  let attempts = 0
  world.methods.one.match = (...args) => {
    attempts += 1
    return original(...args)
  }
  let result
  try {
    result = doc.sweep(net, { tagger: false })
  } finally {
    world.methods.one.match = original
  }
  t.deepEqual(result.view.out('array'), ['hello', 'world.'], 'only the anchored words match')
  t.equal(attempts, 2, 'wrong boundaries skip the matcher')
  t.end()
})

test('sweep boundary filtering preserves match results', t => {
  const world = nlp.world()
  const patterns = [
    '^hello', 'world$', '^hello world$', '^(hello|world)', '(hello|world)$',
    '^#Noun', '#Noun$', '^hello? world', 'hello world?$', '^!hello world',
    'hello !world$', '^hello+ world', 'hello world+$', '^(hello world|world)',
    '(hello world|world)$', '^.', '.$', '^/hello/', '/world/$', "we've$",
  ]
  const inputs = [
    '', 'hello', 'world', 'hello world', 'world hello', 'hello hello world world',
    'hello world. world hello.', "we've", "hello we've", 'the cat', 'cat hello',
  ]
  patterns.forEach(match => {
    const rule = { match }
    const net = world.methods.one.buildNet([rule], world)
    const { startTerm, endTerm } = rule
    inputs.forEach(text => {
      const doc = nlp(text)
      rule.startTerm = startTerm
      rule.endTerm = endTerm
      const actual = doc.sweep(net, { tagger: false }).view.out('array')
      rule.startTerm = null
      rule.endTerm = null
      const expected = doc.sweep(net, { tagger: false }).view.out('array')
      t.deepEqual(actual, expected, `${match}: ${text}`)
    })
  })
  t.end()
})
