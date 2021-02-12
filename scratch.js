const nlp = require('./src/index')
// nlp.extend(require('./plugins/numbers/src'))
// nlp.verbose(true)

//
//
//
//
//
//
//

const lexicon = {
  'Jardas al Abid': 'Place',
  'Umm Ar Rizam': 'Place',
  Tobruk: 'Place',
}

const sentence = 'hello Jardas-al-Abid yes.'
nlp(sentence, lexicon).debug()

// let doc = nlp('twelve and one twentieth').debug()
// let doc = nlp('in time').debug()
// console.log(nlp.world().words['falls over'])
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
