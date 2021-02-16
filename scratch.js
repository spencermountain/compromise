const nlp = require('./src/index')
// nlp.extend(require('./plugins/numbers/src'))
// nlp.verbose(true)

//
//
//
//
//
//

// (i|we|and) (am|have) !not? * (booked|appointment|booking) this? the? (him|her|them|patient)? for? (this|him|her|them|#Noun),positive,I have booked him for this,
// (i|we|and) (am|have) !not? * (booked|appointment|booking) this? the? (him|her|them|patient)? for? (this|him|her|them|#Noun),negative,I have not booked him for this,
//

// let match = `(i|we|and) (am|have) !not? * (booked|appointment|booking) this? the? (him|her|them|patient)? for? (this|him|her|them|#Noun)`
// let text = `I have booked him for this,`
// let doc = nlp(text).match(match).debug()

let doc = nlp(`I have not booked him`)

console.log(doc.match(`have !not? * booked`).found)
// true
console.log(doc.match(`have !not? booked`).found)
//false

// let doc = nlp('twelve and one twentieth').debug()
// let doc = nlp('fifty one twentieth').debug()
// console.log(doc.fractions().json())

// let doc = nlp(`is not foobar isn't`)
// doc = doc.terms().unique().debug()
// console.log('|' + nlp(`isn't`).text('implicit') + '|')

// console.log(`|${doc.text()}|`)

// doc.termList().forEach(t => {
//   console.log(t.text, t.isImplicit())
// })

// console.log(nlp('in the town where I was born').pennTags({ offset: true })[0])
// let reg = nlp.parseMatch(`before (#Value .) after`)
// // console.log(JSON.stringify(reg, null, 2))
// doc.match(reg).debug()

// #802
// nlp('are you available').sentences().toFutureTense().debug()

// #737
// nlp('i am being driven').sentences().toPastTense().debug()
// nlp('i should drive').sentences().toFutureTense().debug()
// nlp('i should have been driven').sentences().toFutureTense().debug()
