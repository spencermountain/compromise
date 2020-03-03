const test = require('tape')
const nlp = require('./_lib')

test('redact-default', function(t) {
  let doc = nlp('i gave John Smith 900£ on December 1st in Paris, France.')
  let m = doc.redact({})
  let str = m.text().replace(/▇+/gu, '▇')
  t.equal(str, 'i gave ▇ ▇ ▇ in ▇.')
  t.end()
})
