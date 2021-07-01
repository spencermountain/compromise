import test from 'tape'
import nlp from './_lib.js'

const testMatches = function (arr) {
  test('main-match-tag:', function (t) {
    arr.forEach(function (a) {
      let doc = nlp(a[0])
      let msg = `'${(a[0] + "' ").padEnd(20, '.')}  - '${a[1]}'`
      t.equal(doc.has(a[1]), true, msg)
    })
    t.end()
  })
}

export { testMatches }
