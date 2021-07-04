import test from 'tape'
import nlp from '../lib/_lib.js'

test('multiword OR', function (t) {
  let m = nlp('i saw the canadian senate floor').match('the (united states|canadian) senate')
  t.equal(m.text(), 'the canadian senate', 'one-word multi')

  m = nlp('i saw the united states senate floor').match('the (united states|canadian) senate')
  t.equal(m.text(), 'the united states senate', 'two-word multi')

  m = nlp('i saw the united states of america senate floor').match(
    'the (brazillian|united states of america|canadian) senate'
  )
  t.equal(m.text(), 'the united states of america senate', 'four-word multi')

  m = nlp('i saw him').match('i saw (the person|#Pronoun)')
  t.equal(m.text(), 'i saw him', 'single-tag multi')

  m = nlp('i saw everything').match('i saw (the person|#Pronoun)?')
  t.equal(m.text(), 'i saw', 'multi-word optional')

  m = nlp('i saw the person go').match('i saw [(the hat|#Pronoun)]')
  t.equal(m.text(), '', 'multi-word negative')

  m = nlp('i saw the person go').match('i saw [(the person|#Pronoun)]', 0)
  t.equal(m.text(), 'the person', 'multi-word group')

  m = nlp('i saw tina turner go').match('i saw [<match>(the person|#Pronoun|tina turner)]', 'match')
  t.equal(m.text(), 'tina turner', 'multi-word named-group')

  m = nlp('i saw tina harris go').match('i saw [<match>(the person|#Pronoun|tina turner)]', 'match')
  t.equal(m.text(), '', 'multi-word named-group negative')

  t.end()
})
