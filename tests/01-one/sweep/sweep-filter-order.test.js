import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/sweep/sweep-filter-order] '

test(here + 'sweep filtering preserves legacy candidate order and results', t => {
  const world = nlp.world()
  const rules = [
    { match: 'red blue' },
    { match: '^blue' },
    { match: 'blue$' },
    { match: '(red|blue)' },
    { match: '/red/' },
    { match: 'red red red red' },
    { match: 'blue', ifNo: 'red' },
    { match: '(red|blue) (green|yellow)' },
    { match: '.' },
  ]
  const net = world.methods.one.buildNet(rules, world)
  const legacy = { hooks: net.hooks, always: net.always }
  const texts = ['', 'red', 'blue', 'red blue', 'blue red', 'red green', 'blue yellow', 'red blue. blue red.']
  const options = [{}, { matchOne: true }]
  texts.forEach(text => {
    const doc = nlp(text)
    options.forEach(opts => {
      const actual = world.methods.one.bulkMatch(doc.docs, net, world.methods, opts)
      const expected = world.methods.one.bulkMatch(doc.docs, legacy, world.methods, opts)
      t.deepEqual(actual, expected, `${text}: matchOne=${Boolean(opts.matchOne)}`)
    })
  })
  t.end()
})
