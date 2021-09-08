import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/people-parse] '

test('people-parse:', function (t) {
  let arr = [
    // by firstname
    ['john turner', 'male'],
    ['dr James Smith', 'male'],
    ['dr Debrah Smith', 'female'],
    // by honorific
    ['Mr Springer', 'male'],
    ['his excellency kerry adams', 'male'],
    // ambig
    ['kerry adams', null],
    ['dr adams', null],
  ]
  arr.forEach(a => {
    let [str, want] = a
    let res = nlp(str).people().json()[0]
    t.equal(res.person.presumed_gender, want, here + 'gender - ' + str)
  })
  t.end()
})
