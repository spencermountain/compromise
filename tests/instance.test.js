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

test('nlp-global', function (t) {
  const instance = nlp.clone().extend(plugin)
  const instance2 = nlp.clone()

  t.equal(nlp().world.words.marko.includes('Place'), true)
  t.equal(instance().world.words.marko.includes('Place'), true)
  t.equal(instance2().world.words.marko.includes('Place'), true)

  t.end()
})

test('nlp-instance', function (t) {
  const instance = nlp.clone().extend(plugin)
  const instance2 = nlp.clone()

  t.equal(instance().world.test, 'test')
  t.equal(instance2().world.test, undefined)

  t.end()
})

test('original nlp changes', function (t) {
  const nlpBefore = nlp.clone()
  nlp.extend((Doc, world) => {
    world.addWords({ blahblah: 'Yes' })
  })
  const nlpAfter = nlp.clone()

  t.equal(nlp('blahblah').has('#Yes'), true, 'native nlp changed')
  t.equal(nlpBefore('blahblah').has('#Yes'), false, 'original before-change')
  t.equal(nlpAfter('blahblah').has('#Yes'), true, 'original after-change')

  t.end()
})

test('new nlp changes', function (t) {
  const nlpChange = nlp.clone()
  nlpChange.extend((Doc, world) => {
    world.addWords({ foofoo: 'Yes' })
  })
  const nlpAfter = nlp.clone()

  t.equal(nlpChange('foofoo').has('#Yes'), true, 'nlp is changed')

  t.equal(nlp('foofoo').has('#Yes'), false, 'original unchanged')
  t.equal(nlpAfter('foofoo').has('#Yes'), false, 'after unchanged')

  t.end()
})

test('new nlp changes twice', function (t) {
  const nlpChange = nlp.clone().extend((Doc, world) => {
    world.addWords({ foofoo: 'Yes' })
  })
  const nlpAfter = nlpChange.clone().extend((Doc, world) => {
    world.addWords({ booboo: 'Yes' })
  })

  t.equal(nlpChange('foofoo').has('#Yes'), true, 'nlp is changed')

  t.equal(nlp('foofoo').has('#Yes'), false, 'original unchanged')
  t.equal(nlpAfter('foofoo').has('#Yes'), true, 'after changed')

  t.equal(nlpChange('booboo').has('#Yes'), false, 'nlp is not changed again')
  t.equal(nlpAfter('booboo').has('#Yes'), true, 'after changed again')

  t.end()
})
