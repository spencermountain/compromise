import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/gender] '

test('people-gender:', function (t) {
  const m = 'male'
  const f = 'female'
  let arr = [
    // by firstname
    ['john turner', m],
    ['dr James Smith', m],
    ['dr Debrah Smith', f],
    // by honorific
    ['Mr Springer', m],
    ['his excellency kerry adams', m],
    // ambig
    ['kerry adams', null],
    ['dr adams', null],
    // from pronoun
    ['kris fogel', null],
    ['kris fogel said he liked it', m],
    ['kris fogel said her shoes fit', f],
    ['kris and amy washed her car', null], //ambig
  ]
  arr.forEach(a => {
    let [str, want] = a
    let res = nlp(str).people().json()[0] || {}
    t.equal((res.person || {}).presumed_gender, want, here + 'gender - ' + str)
  })
  t.end()
})
