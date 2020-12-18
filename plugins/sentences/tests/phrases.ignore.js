const test = require('tape')
const nlp = require('./_lib')
const data = require('./data/svo-data')
// console.log(data.length)

//--
// let doc = nlp(`despite working hard, the tired old city doctor was very happy.`)
// let doc = nlp(`Her dog, a bull mastiff, looks ridiculous with a pink bow stuck to her head`)
// let doc = nlp(`We can all go for ice cream if I can find my wallet.`)
// let doc = nlp(`When the sun went down, I hurried back.`)
// let doc = nlp(`Americans have to put away their free market fetishism and start to vote`)
// let doc = nlp(`the "minimum" that the Pakistan army will accept.`)
// let doc = nlp(`Most of those men`)
// let doc = nlp(`Many of those men`)
// let doc = nlp(`I am in mediation.`)
// let doc = nlp('Wilson was claiming that he had been working for the CIA when he sold the C-4 to Quaddaffi.')

test('phrases', function (t) {
  data.forEach((o) => {
    let doc = nlp(o.txt)
    if (o.subj) {
      let m = doc.match(o.subj)
      if (m.length === 1) {
        t.ok(m.has('#NounPhrase'), o.txt.substr(0, 25) + '   ... ' + o.subj)
      }
    }

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

    // let m = doc.match('#Preposition #Preposition')
    // if (m.found) {
    //   m = m.eq(0)
    //   console.log(o.txt.substr(0, 35) + '   ... ' + m.out('array')[0])
    // }

    // let m = doc.match('#NounPhrase+ !#NounPhrase #NounPhrase')
    // let m = doc.match('#VerbPhrase+ #Conjunction #VerbPhrase')
    // if (m.found) {
    //   m = m.eq(0)
    //   console.log(m.out('array'))
    // }
  })
  t.end()
})
