import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/bullets] '

// should not strip bullets
test('dont-debullet', function (t) {
  t.plan(2)
  let str = 'it is-cool. he is- nice-'
  let m = nlp(str)
  m.sentences().debullet()
  t.equal(m.out('text'), str, here + `don't debullet hyphens`)

  str = `i was -
feeling weird -
were you too?`

  m = nlp(str)
  m.sentences().debullet()
  t.equal(m.out('text'), str, here + `don't debullet hyphens with multi-line`)
  t.end()
})

// should strip bullets
test('do-debullet', function (t) {
  t.plan(6)
  let str = '- it is-cool - he is nice'
  let expected = 'it is-cool - he is nice'
  let m = nlp(str)
  m.sentences().debullet()
  t.equal(m.out('text'), expected, here + `do debullet line beginning hyphen`)

  // all `str` below should match `expected` after debullet()
  expected = `it is-cool 
he is nice
oooh yeah, baby!`

  str = `- it is-cool 
- he is nice
- oooh yeah, baby!`

  m = nlp(str)

  m.sentences().debullet()
  t.equal(m.out('text'), expected, here + `do debullet multiline beginning hyphen`)

  str = `-it is-cool 
-he is nice
-oooh yeah, baby!`

  m = nlp(str)

  m.sentences().debullet()
  t.equal(m.out('text'), expected, here + `do debullet multiline beginning hyphen no-space`)

  str = `* it is-cool 
* he is nice
* oooh yeah, baby!`

  m = nlp(str)

  m.sentences().debullet()
  t.equal(m.out('text'), expected, here + `do debullet multiline beginning asterisk`)

  str = `• it is-cool 
• he is nice
• oooh yeah, baby!`

  m = nlp(str)

  m.sentences().debullet()
  t.equal(m.out('text'), expected, here + `do debullet multiline beginning bullet char`)

  str = `•it is-cool 
•he is nice
•oooh yeah, baby!`

  m = nlp(str)

  m.sentences().debullet()
  t.equal(m.out('text'), expected, here + `do debullet multiline beginning bullet char nospace`)

  t.end()
})
