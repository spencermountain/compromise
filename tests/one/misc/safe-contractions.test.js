import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/safe-contractions] '


test('safe-apostrophe-s', function (t) {
  let arr = [
    // yes
    [`She's got me`, 4],
    [`Let’s not`, 3],
    [`that's it!`, 3],
    [`what’s going on?`, 4],
    [`There's a row`, 4],
    [`It's unbelievable`, 3],

    // no
    [`Luke's Diner`, 2],
    [`Murphy's law`, 2],
    [`Gandhi's philosophy `, 2],

    // tricky-yes
    // [`Gandhi's cool `, 3],
    [`Gandhi's so early `, 4],


    // toronto's massive party
    // toronto's massive
    // toronto's trying
    // ['',]
  ]
  arr.forEach(a => {
    let terms = nlp(a[0]).terms()
    t.equal(terms.length, a[1], here + a[0])
  })
  t.end()
})


test('safe-apostrophe-d', function (t) {
  let arr = [
    // [`she'd say`, 'she would say'],
    [`she'd go`, 'she would go'],
    [`we'd go`, 'we would go'],
    [`we'd gone`, 'we had gone'],
    // [`i'd phoned`, `i had phoned`],
  ]
  arr.forEach(a => {
    let str = nlp(a[0]).text('machine')
    t.equal(str, a[1], here + a[0])
  })
  t.end()
})
