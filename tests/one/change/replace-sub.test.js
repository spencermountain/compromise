import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/replace-sub] '

test('replace-sub-num :', function (t) {
  let doc = nlp('walk the plank')
  doc.replace('walk the [.]', 'eat the $0')
  t.equal(doc.text(), 'eat the plank', here + '$0')

  doc = nlp('walk the plank quickly')
  doc.replace('walk the [(line|plank)]', 'eat the $0')
  t.equal(doc.text(), 'eat the plank quickly', here + '$0-2')

  doc = nlp('my name is spencer and i eat chocolate')
  doc.replace('my name is [.] and i eat [.]', '$1 for $0 please')
  t.equal(doc.text(), 'chocolate for spencer please', here + '$1')
  t.end()
})

test('replace-named-sub :', function (t) {
  let doc = nlp('walk the plank')
  doc.replace('walk the [<thing>.]', 'eat the $thing')
  t.equal(doc.text(), 'eat the plank', here + '$thing')

  doc = nlp('i\'m george and i live in Canada.')
  doc.replace('i am [<name>.] and i live in [<place>(paris|canada)]', 'i\'m $name from $place')
  t.equal(doc.text(), 'i\'m george from Canada.', here + '$name $place')


  doc = nlp('i am jean pierre and i live in Paris.')
  doc.replace('[<name>jean pierre] and i live in [(paris|london)]', '$name from $0')
  t.equal(doc.text(), 'i am jean pierre from Paris.', here + '$name $0')
  t.end()
})