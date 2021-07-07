const test = require('tape')
const nlp = require('../_lib')

test('nlp.clone() -change original', function (t) {
  let nlp2 = nlp.clone()
  t.ok(nlp('bat').has('#Noun'), 'nlp1-init')
  t.ok(nlp2('bat').has('#Noun'), 'nlp2-init')

  //change nlp1
  nlp.extend((Doc, world) => {
    world.addWords({
      bat: 'Man',
    })
  })
  t.ok(nlp('bat').has('#Man'), 'nlp1-changed')
  t.ok(nlp2('bat').has('#Man') === false, 'nlp2-unchanged')

  //change nlp2
  nlp2.extend((Doc, world) => {
    world.addWords({
      bat: 'ManTwo',
    })
  })
  t.ok(nlp('bat').has('#ManTwo') === false, 'nlp1-changed')
  t.ok(nlp2('bat').has('#ManTwo') === true, 'nlp2-unchanged')

  //try nlp3
  let nlp3 = nlp.clone()
  t.ok(nlp3('bat').has('#Noun'), 'nlp3-normal-default')
  t.ok(nlp3('bat').has('#Man') === false, 'nlp3-normal')
  t.ok(nlp3('bat').has('#ManTwo') === false, 'nlp3-normal-again')

  t.end()
})
