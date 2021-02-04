const nlp = require('./src/index')
nlp.extend(require('./plugins/sentences/src'))
nlp.extend(require('./plugins/penn-tags/src'))
// nlp.verbose(true)

//
//
//
//
//
//
//

/*
  have  - false
  [not] - true
  done  - false
*/

// let doc = nlp(`haven't done`)
// doc.match(`have done`).debug()

// let doc = nlp(`i haven't done it`)
// let m = doc.match(`not done`)
// console.log(`|${m.text()}|`)
// m.debug()

let doc = nlp(`is not foobar isn't`)
doc = doc.terms().unique().debug()
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
