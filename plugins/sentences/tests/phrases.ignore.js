const test = require('tape')
const nlp = require('./_lib')
const data = require('./data/svo-data')
// console.log(data.length)

test('phrases', function (t) {
  data.forEach((o) => {
    let doc = nlp(o.txt)
    // if (o.subj) {
    //   let m = doc.match(o.subj)
    //   if (m.length === 1) {
    //     t.ok(m.has('#NounPhrase'), o.txt.substr(0, 25) + '   ... ' + o.subj)
    //   }
    // }

    // let m = doc
    //   .not('#NounPhrase')
    //   .not('#VerbPhrase')
    //   .not('#AdjectivePhrase')
    //   .not('#Conjunction')
    //   .not('#Preposition')
    // if (m.found) {
    //   m = m.eq(0)
    //   console.log(o.txt.substr(0, 15) + '   ... ' + m.out('array')[0])
    // }

    let m = doc.match('#Preposition #Preposition')
    if (m.found) {
      m = m.eq(0)
      console.log(o.txt.substr(0, 35) + '   ... ' + m.out('array')[0])
    }

    // let m = doc.match('#NounPhrase+ !#NounPhrase #NounPhrase')
    // let m = doc.match('#VerbPhrase+ #Conjunction #VerbPhrase')
    // if (m.found) {
    //   m = m.eq(0)
    //   console.log(m.out('array'))
    // }
  })
  t.end()
})
