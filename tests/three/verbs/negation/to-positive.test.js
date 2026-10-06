import test from 'tape'
import nlp from '../../_lib.js'
const here = '[three/verbs/negation/to-positive] '

test('inline verb toPositive:', function (t) {
  const arr = [
    [`he does not like camels`, 'he likes camels'],
    [`he did not like camels`, 'he liked camels'],
    [`he doesn't like camels`, 'he likes camels'],
    [`she didn't go home`, 'she went home'],
    [`it does not matter`, 'it matters'],
    [`he does not have a car`, 'he has a car'],
    [`he does not really like camels`, 'he really likes camels'],
    [`spencer did not walk`, 'spencer walked'],
    // already worked
    [`they do not like camels`, 'they like camels'],
    [`i do not like camels`, 'i like camels'],
    [`do not use reverse psychology`, 'use reverse psychology'],
    [`he is not cool`, 'he is cool'],
    [`he will not go`, 'he will go'],
    [`he has not eaten`, 'he has eaten'],
  ]
  arr.forEach(function (a) {
    const doc = nlp(a[0])
    doc.verbs().toPositive()
    const str = doc.text('normal')
    t.equal(str, a[1], here + a[1] + ' --- ' + str)
  })
  t.end()
})
