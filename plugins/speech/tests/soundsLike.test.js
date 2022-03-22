import test from 'tape'
import nlp from './_lib.js'

test('soundsLike-tests', function (t) {
  let arr = [
    ['phil collins', 'fil kolins'],
    ['Philadelphia freedom', 'filatelfia fretom'],
    ['Shine on me', 'shine on me'],
    ['peace of mind', 'pease of mint'],
    ['Yes I do', 'yes i to'],
    ['Zapped me', 'sapet me'],
    ['Right between the eyes', 'rit betwen the eyes'],
    // ['But the times have changed', 'but the times hafe kshanjet'],
  ]
  arr.forEach((a) => {
    let doc = nlp(a[0])
    let str = doc.soundsLike({})[0].join(' ')
    t.equal(str, a[1], a[0])
  })
  t.end()
})
