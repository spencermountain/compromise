const test = require('tape')
const nlp = require('./_lib')

const globalPlugin = (Doc, world) => {
  world.addWords({
    marko: 'Place',
  })
}

nlp.extend(globalPlugin)

const plugin = (Doc, world) => {
  world.test = 'test'
}

test('nlp-global', function(t) {
  const instance = nlp.instance().extend(plugin)
  const instance2 = nlp.instance()

  t.equal(nlp().world.words.marko.includes('Place'), true)
  t.equal(instance().world.words.marko.includes('Place'), true)
  t.equal(instance2().world.words.marko.includes('Place'), true)

  t.end()
})

test('nlp-instance', function(t) {
  const instance = nlp.instance().extend(plugin)
  const instance2 = nlp.instance()

  t.equal(instance().world.test, 'test')
  t.equal(instance2().world.test, undefined)

  t.end()
})
