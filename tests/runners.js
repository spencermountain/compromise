import test from 'tape'
import nlp from './_lib.js'

const testMatches = function (arr) {
  test('main-match-tag:', function (t) {
    arr.forEach(function (a) {
      let doc = nlp(a[0])
      // let tags = doc.json()[0].terms.map(term => term.tags[0])
      let msg = `'${(a[0] + "' ").padEnd(20, '.')}  - '${a[1]}'`
      // let msg = `'${(a[0] + "' ").padEnd(20, '.')}  - '${tags.join(' ')}'`

      t.equal(doc.has(a[1]), true, msg)
    })
    t.end()
  })
}

export { testMatches }
