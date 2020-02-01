// do an elaborate comparison between json objects
const isEqual = function(a, b, t) {
  let jsonA = a.json()
  let jsonB = b.json()
  t.equal(a.length, b.length, 'same length')
  t.equal(a.text(), b.text(), 'same text')
  jsonA.forEach((o, i) => {
    t.equal(o.text, jsonB[i].text, o.text)
    t.equal(o.terms.length, jsonB[i].terms.length, 'terms-length ' + i)
    o.terms.forEach(term => {
      term.tags.forEach(tag => {
        let p = b.eq(i)
        if (p.has('#' + tag) === false) {
          t.ok(false, p.text() + ' has ' + tag)
        }
      })
    })
  })
}
module.exports = isEqual
