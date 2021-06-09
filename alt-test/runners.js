const test = require('tape')
const nlp = require('./_lib')

const testMatches = function (arr) {
  test('main-match-tag:', function (t) {
    arr.forEach(function (a) {
      let doc = nlp(a[0])
      t.equal(doc.has(a[1]), true, a[0])
    })
    t.end()
  })
}

module.exports = { testMatches }
