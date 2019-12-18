const test = require('tape')
const nlp = require('./_lib')

//make sure it can handle garbage inputs
test('garbage-inputs', function(t) {
  const garbage = ['', '  ', null, '\n\n', []] //{}
  garbage.forEach(function(g, i) {
    let num = nlp(g).list.length
    let msg = typeof g + ' text input #' + i + '  ' + g
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

test('only-punctuation', function(t) {
  const garbage = ['.', ' - ', '...', '?', '&', '?,', '\n. \n', '🎵', '\n🇵🇷\n', '🇵🇷.', `🇷 %`]
  garbage.forEach(function(str) {
    let doc = nlp(str)
    t.equal(doc.text(), str, "text-'" + str + "'")
  })
  t.end()
})
