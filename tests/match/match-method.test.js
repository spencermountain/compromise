var test = require('tape')
var nlp = require('../_lib')

test('match-methods:', function(t) {
  let arr = [
    ['@hasComma bravery', 'truth, bravery'],
    ['spencer @hasPeriod', 'spencer did.'],
    ['spencer @hasExclamation', 'spencer did!'],
    ['spencer @hasQuestionMark', 'spencer did?'],
    ['spencer @hasEllipses', 'spencer did...'],
    ['no @hasSemicolon i said', 'no fair; i said'],
    ['@hasSlash hurricane', 'tornado/hurricane'],
    ['tornado @hasSlash', 'tornado/hurricane'],
    ['he @hasContraction', "he isn't going"],
    ['@isAcronym', 'FIFA'],
    ['@isKnown', 'spencer'],
  ]
  arr.forEach(a => {
    let doc = nlp(a[1])
    t.equal(doc.has(a[0]), true, a[0])
  })
  t.end()
})
