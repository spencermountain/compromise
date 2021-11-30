import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/confidence] '

test('confidence', function (t) {
  let arr = [
    ['', 1],
    ['asdfasdf', 0.1],
    ['google', 1],
    ['jlcekehj is', 0.6],
    ['yelpily good', 0.85],

    // [ 'Striking revenue workers threaten gherao',null]
    // [ 'Madhuri goes dhak-dhak again',null]
    // [ `ACF's development committee meets`,null]
    // [ 'State govt gives HR panel office space',null]
  ]
  arr.forEach(a => {
    let [str, score] = a
    t.equal(nlp(str).confidence(), score, here + str)
  })

  let json = nlp('errerum esto lominae').json({ confidence: true })[0]
  t.equal(json.confidence, 0.1, 'confidence in json')
  t.end()
})
