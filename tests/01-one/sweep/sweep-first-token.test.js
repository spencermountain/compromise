import test from 'tape'
import nlp from '../../lib/one.js'
const here = '[one/sweep/sweep-first-token] '

test(here + 'sweep finds matches after rejected starting terms', t => {
  const world = nlp.world()
  const net = world.methods.one.buildNet([{ match: 'hello [world]', group: '0' }], world)
  const doc = nlp('well hello world and hello world again')
  t.deepEqual(doc.sweep(net, { tagger: false }).view.out('array'), ['world', 'world'], 'preserves later matches and captures')
  t.end()
})

test(here + 'sweep first-token check preserves pointers and groups', t => {
  const world = nlp.world()
  const patterns = [
    'hello world', '[hello] world', 'hello [world]', '(hello|world)',
    '#Noun', '^hello', 'world$', '^hello world$', 'hello? world', '!hello world',
    'hello+ world', '(hello world|world)', '(hello && #Noun)', '.', '.* world',
    '/hello/ world', '@hasContraction', "we've", '{walk}', '~hello~',
  ]
  const texts = [
    '', 'hello', 'world', 'hello world', 'world hello', 'hello hello world world',
    'well hello world and hello world again', 'hello world. world hello.',
    "we've walked home", "hello we've", 'the cat walked', 'Hello world',
  ]
  patterns.forEach(match => {
    const rule = { match }
    world.methods.one.buildNet([rule], world)
    const enabled = rule.checkFirst
    texts.forEach(text => {
      const doc = nlp(text)
      rule.checkFirst = enabled
      const actual = world.methods.one.match(doc.docs, rule)
      rule.checkFirst = false
      const expected = world.methods.one.match(doc.docs, rule)
      t.deepEqual(actual, expected, `${match}: ${text}`)
    })
  })
  t.end()
})
