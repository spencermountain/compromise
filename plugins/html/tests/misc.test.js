const test = require('tape')
const nlp = require('./_lib')

test('html output', function(t) {
  let doc = nlp('i <3 you')
  t.equal(doc.html(), '<pre><span>i &lt;3 you</span></pre>', 'html escaped')
  doc = nlp()
  t.end()
})
