import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/match-method] '

// some done
test('match-methods:', function (t) {
  let arr = [
    ['@hasComma bravery', 'truth, bravery'],
    ['spencer @hasPeriod', 'spencer did.'],
    ['spencer @hasExclamation', 'spencer did!'],
    ['spencer @hasQuestionMark', 'spencer did?'],
    ['spencer @hasEllipses', 'spencer did...'],
    ['no @hasSemicolon i said', 'no fair; i said'],
    ['hurricane', 'tornado/hurricane'],
    ['tornado', 'tornado/hurricane'],
    ['@hasSlash', 'tornado/hurricane'],
    ['a @hasSlash', 'rock you like a tornado/hurricane'],
    ['he @hasContraction', "he isn't going"],
    ['@isAcronym', 'FIFA'],
    ['@isKnown', 'spencer'],
  ]
  arr.forEach(a => {
    let doc = nlp(a[1])
    t.equal(doc.has(a[0]), true, here + a[0])
  })
  t.end()
})

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

  t.end()
})
