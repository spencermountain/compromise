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
  ]
  arr.forEach(a => {
    let [str, score] = a
    t.equal(nlp(str).confidence(), score, here + str)
  })

  let json = nlp('errerum esto lominae').json({ confidence: true })[0]
  t.equal(json.confidence, 0.1, 'confidence in json')
  t.end()
})
