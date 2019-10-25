const test = require('tape')
const nlp = require('./_lib')

test('misc values', function(t) {
  let doc = nlp(`quickly, suddenly`)
  t.equal(doc.values().length, 0, 'found no values')

  doc = nlp(`seven is slightly before eleven, but after two.`)
  t.equal(doc.values().length, 3, 'found three values')
  t.end()
})

test('misc:', function(t) {
  // let str = '2 million five hundred thousand and fifty nine is bigger than 2882'
  // let m = nlp(str)
  // m.values().toNumber()
  // t.equal(m.out('normal'), '2500059 is bigger than 2882', str)

  // str = '2 million five hundred thousand and fifty nine is bigger than 2882'
  // m = nlp(str)
  // m.values().toNice()
  // t.equal(m.out('text'), '2,500,059 is bigger than 2,882', str)

  // str = 'doug is 5 years old'
  // m = nlp(str)
  // m.values().toText()
  // t.equal(m.out('normal'), 'doug is five years old', str)

  // let r = nlp('Homer, have you been eating that sandwich again?')
  //   .terms()
  //   .slice(0, 3)
  // t.equal(r.out('text'), 'Homer, have you', 'result.slice')

  // str = 'men go';
  // m = nlp(str).sentences().toPastTense().nouns().toSingular();
  // t.equal(m.out('normal'), 'a man went', str);

  t.end()
})