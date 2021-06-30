import test from 'tape'
import nlp from './_lib.js'

const testMatches = function (arr) {
  test('main-match-tag:', function (t) {
    arr.forEach(function (a) {
      let doc = nlp(a[0])
      t.equal(doc.has(a[1]), true, a[0])
    })
    t.end()
  })
}

export { testMatches }
