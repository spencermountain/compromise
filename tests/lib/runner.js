const positive = function (arr) {
  test('match:', function (t) {
    arr.forEach(function (a) {
      let doc = nlp(a[0])
      let msg = `'${(a[0] + "' ").padEnd(20, '.')}  - '${a[1]}'`
      t.equal(doc.has(a[1]), true, here + msg)
    })
    t.end()
  })
}
export { positive, negative }
