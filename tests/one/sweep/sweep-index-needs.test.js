import test from 'tape'
import nlp from '../../two/_lib.js'

test('sweep index shortcuts preserve repeated needs and alternatives', t => {
  const world = nlp.world()
  const repeated = { match: 'red red', hook: 'red' }
  const rules = [repeated, { match: '(red|blue)' }, { match: 'red blue green', hook: 'blue' }, repeated, { match: '.' }]
  const net = world.methods.one.buildNet(rules, world)
  const legacy = { hooks: net.hooks, always: net.always }
  const oldEntries = new Map()
  const oldIndex = Object.fromEntries(Object.entries(net.index).map(([key, entries]) => [key, entries.map(entry => {
    if (!oldEntries.has(entry)) {
      const { rule, order, rank, earlier } = entry
      oldEntries.set(entry, { rule, order, rank, earlier })
    }
    return oldEntries.get(entry)
  })]))
  const older = { ...net, index: oldIndex }
  const options = [{}, { matchOne: true }]
  const texts = ['', 'red', 'red red', 'red blue', 'red blue green', 'blue green', 'red red. blue red.']
  texts.forEach(text => {
    const doc = nlp(text)
    options.forEach(opts => {
      const expected = world.methods.one.bulkMatch(doc.docs, legacy, world.methods, opts)
      t.deepEqual(world.methods.one.bulkMatch(doc.docs, net, world.methods, opts), expected, `new index: ${text}`)
      t.deepEqual(world.methods.one.bulkMatch(doc.docs, older, world.methods, opts), expected, `old index: ${text}`)
    })
  })
  t.end()
})
