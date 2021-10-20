const test = require('tape')
const nlp = require('../_lib')

test('verb.subject():', function (t) {
  let arr = [
    ['i walked', 'i'],
    ['john was cool', 'john'],
    ['john really was cool', 'john'],
    ['john was really cool', 'john'],
    ['john did not really drive', 'john'],
    ['john would not have really driven', 'john'],
    ['speak!', ''],
    ['please go to the mall', ''],
    ['shut the door', ''],
    ['i shall go there', 'i'],
    ['he walks carefully and eats a grape', 'he'],
    ['if so, john should pay for it', 'john'],
    ['you really think so?', 'you'],
    ['the moon is made of cheese', 'moon'],
    [`listen to the wind blow, watch the sun rise.`, ''],
    [`run in the shadows, damn your love, damn your lies. `, ''],
    [`listen to the wind blow down comes the night. `, ''],
    [`running in the shadows damn your love, damn your lies. `, ''],
    [`break the silence, damn the dark, damn the light.`, ''],
    [`some should decrease.`, ''],
    [`join the community of conscience.`, ''],
    [`why is everything different?`, ''],
    [`bye!`, ''],
    [`oh dear god!`, ''],
    [`is there something wrong?`, ''],
    [`why is ross naked?`, ''],
    [`yeah the big homey`, ''],
    [`the type of female wit fly gucci gear`, ''],
    [`compared to the heart of a man`, ''],
    [`give me a red rose, she cried`, ''],
    [`drinking orange juice out of a champagne glass.`, ''],
    //
    [`it moves power and decision making closer to the people.`, 'it'],
    [`that is completely untrue.`, 'that'],
    [`i better hit the shower.`, 'i'],
    [`morning's here!`, 'morning'],
  ]
  arr.forEach(function (a) {
    const str = nlp(a[0]).verbs(0).subject().text('reduced')
    t.equal(str, a[1], a[0] + ' -> ' + str)
  })
  t.end()
})

// let clauses = [
//   `once established, federal programs seem to become immortal.`,
//   `working with congress and the governors, i propose we select at least $15 billion`,
//   `that's  why i'm  submitting a budget `,
//   `what is at stake is more than one small country, it is a big idea`,
//   `i mean its amazing pheebs.`,
//   `believe me, i lived with her for 16 years.`,
//   `in 2003 alone, according to state government data, there were over 6.4 million visitors`,
//   `but wait i hear they're  prissy, bourgeois, all that`,
// ]
