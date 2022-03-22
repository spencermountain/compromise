import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/multiword] '

test('multiword OR', function (t) {
  let m = nlp('i saw the canadian senate floor').match('the (united states|canadian) senate')
  t.equal(m.text(), 'the canadian senate', here + 'one-word multi')

  m = nlp('i saw the united states senate floor').match('the (united states|canadian) senate')
  t.equal(m.text(), 'the united states senate', here + 'two-word multi')

  m = nlp('i saw the united states of america senate floor').match(
    'the (brazillian|united states of america|canadian) senate'
  )
  t.equal(m.text(), 'the united states of america senate', here + 'four-word multi')

  m = nlp('i saw him').match('i saw (the person|#Pronoun)')
  t.equal(m.text(), 'i saw him', here + 'single-tag multi')

  m = nlp('i saw everything').match('i saw (the person|#Pronoun)?')
  t.equal(m.text(), 'i saw', here + 'multi-word optional')

  m = nlp('i saw the person go').match('i saw [(the hat|#Pronoun)]')
  t.equal(m.text(), '', here + 'multi-word negative')

  m = nlp('i saw the person go').match('i saw [(the person|#Pronoun)]', 0)
  t.equal(m.text(), 'the person', here + 'multi-word group')

  m = nlp('i saw tina turner go').match('i saw [<match>(the person|#Pronoun|tina turner)]', 'match')
  t.equal(m.text(), 'tina turner', here + 'multi-word named-group')

  m = nlp('i saw tina harris go').match('i saw [<match>(the person|#Pronoun|tina turner)]', 'match')
  t.equal(m.text(), '', here + 'multi-word named-group negative')

  t.end()
})
