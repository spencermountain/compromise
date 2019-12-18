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

//make sure it can handle garbage inputs
test('garbage:', function(t) {
  const garbage = ['', '  ', null, '\n\n', [], '.'] //{}
  garbage.forEach(function(g, i) {
    let num = nlp(g).list.length
    let msg = typeof g + ' text input #' + i
    t.equal(num, 0, msg)
  })
  let str = nlp(2).out()
  t.equal(str, '2', 'integer-casted')
  str = nlp(2.2).out()
  t.equal(str, '2.2', 'float-casted')

  //garbage in lexicon too
  str = nlp('hello', null).out()
  t.equal(str, 'hello', 'null-lexicon')

  str = nlp('hello', 2).out()
  t.equal(str, 'hello', 'int-lexicon')
  t.end()
})
