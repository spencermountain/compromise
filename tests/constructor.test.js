const test = require('tape')
const nlp = require('./_lib')

test('extra exports:', function(t) {
  t.ok(nlp.version, 'version number exported')

  t.doesNotThrow(function() {
    nlp.verbose(true)
    nlp.verbose(false)
  }, 'can set verbosity')

  t.end()
})

test('tokenize() runs without pos-tagging', function(t) {
  const str = 'Miss Hoover, I glued my head to my shoulder.'
  const r = nlp.tokenize(str)
  t.equal(r.out('text'), str, 'tokenize output is same')

  t.equal(r.list.length, 1, 'sentence-parser-working')

  const found = r.match('#Noun').found
  t.equal(found, false, 'no sneaky-tagging')

  t.end()
})
