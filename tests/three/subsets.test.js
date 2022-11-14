import test from 'tape'
import nlp from './_lib.js'
const here = '[three/subset] '

test('match shorthand:', function (t) {
  let doc = nlp('the cute and shortest')
  t.equal(doc.adjectives('#Superlative').text(), 'shortest', here + '.adj()')

  doc = nlp('spencer can. jamie cannot.')
  t.equal(doc.nouns('jamie').text(), 'jamie', here + '.nouns()')

  doc = nlp('spencer and jamie')
  t.equal(doc.people('!jamie').text(), 'spencer', here + '.people()')

  doc = nlp('i must walk but i am scared')
  t.equal(doc.verbs('must').text(), 'must walk', here + '.verbs()')

  doc = nlp('i toronto but not hamilton Jamaica')
  t.equal(doc.places('#Country').text(), 'hamilton Jamaica', here + '.places()')


  t.end()
})