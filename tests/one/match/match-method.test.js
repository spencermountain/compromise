import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/match-method] '

test('match @functions', function (t) {
  let doc = nlp(`jamie's much, much better.`)

  let m = doc.match('@hasComma')
  t.equal(m.text(), 'much', here + 'hasComma')

  m = doc.match('(@hasPeriod|cool)')
  t.equal(m.text(), 'better', here + 'hasPeriod')

  m = doc.match('(@hasSemicolon|better)')
  t.equal(m.text(), 'better', here + 'false-positive')

  doc = nlp(`i am much, much better and faster`)
  m = doc.match('!@hasComma')
  t.equal(m.text(), 'i am much better and faster', here + 'negative function')

  doc = nlp(`i am much, much better and faster`)
  m = doc.match('(foo|!@hasComma)')
  t.equal(m.text(), 'i am much better and faster', here + 'negative in optional function')


  m = nlp('set the SCE to AUX.').match('@isUpperCase')
  t.equal(m.length, 2, here + 'two uppercase')

  t.end()
})
