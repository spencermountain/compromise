const test = require('tape')
const nlp = require('../_lib')

test('persistent-lexicon-change', function (t) {
  let nlp2 = nlp.clone()
  let doc = nlp('he is marko')
  t.equal(doc.match('#Place+').length, 0, 'default-no-place')
  t.equal(doc.match('#Person+').length, 1, 'default-one-person')

  nlp2.extend((Doc, world) => {
    world.addWords({
      marko: 'Place',
    })
  })
  doc = nlp2('he is marko')
  t.equal(doc.match('#Place+').length, 1, 'now-one-place')
  t.equal(doc.match('#Person+').length, 0, 'now-no-person')

  nlp2.extend((_Doc, world) => {
    world.addWords({
      foo: 'Place',
    })
  })
  doc = nlp2('he is marko')
  t.equal(doc.match('#Place+').length, 1, 'still-one-place')
  t.equal(doc.match('#Person+').length, 0, 'still-no-person')

  t.end()
})
