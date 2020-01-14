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

test('original nlp changes', function(t) {
  const nlpBefore = nlp.instance()
  nlp.extend((Doc, world) => {
    world.addWords({ blahblah: 'Yes' })
  })
  const nlpAfter = nlp.instance()

  t.equal(nlp('blahblah').has('#Yes'), true, 'native nlp changed')
  t.equal(nlpBefore('blahblah').has('#Yes'), false, 'original before-change')
  t.equal(nlpAfter('blahblah').has('#Yes'), false, 'original after-change')

  t.end()
})

test('new nlp changes', function(t) {
  const nlpChange = nlp.instance()
  nlpChange.extend((Doc, world) => {
    world.addWords({ foofoo: 'Yes' })
  })
  const nlpAfter = nlp.instance()

  t.equal(nlpChange('foofoo').has('#Yes'), true, 'nlp is changed')

  t.equal(nlp('foofoo').has('#Yes'), false, 'original unchanged')
  t.equal(nlpAfter('foofoo').has('#Yes'), false, 'after unchanged')

  t.end()
})
