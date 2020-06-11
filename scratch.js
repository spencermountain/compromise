const nlp = require('./src/index')
// nlp.verbose(true)
// let txt = require('./scripts/test/speed/_sotu-text.js')
nlp.extend(require('./plugins/numbers/src'))
nlp.extend(require('./plugins/dates/src'))

// // let doc = nlp('i am being driven')
// let doc = nlp('i should be driven')
// let doc = nlp('i should drive')
// let doc = nlp('i should drive')
// let doc = nlp('i should have been driven')
// doc.sentences().toFutureTense().debug()
// doc.sentences().toPastTense().debug()

// console.log(nlp('i was born on august 11th 1998').dates().format('{date}-{month}-{year}').text())
// console.log(nlp('i was born in august 11th 1998').dates().format('{date}-{month}-{year}').text())
// console.log(nlp('i was born august 11th 1998').dates().format('{date}-{month}-{year}').text())

// don't publish until fixing local-path in date-plugin.

// doc = nlp(`two days after halloween`)
console.log(nlp('june 5 to june 7').dates().json())
// console.log(nlp('at 6:15').dates(context).json())
// console.log(nlp('3rd of March').dates(context).json())
// console.log(nlp('March 18th').dates(context).json())
// console.log(nlp('March 18th').dates().json())
// console.log(nlp('3rd of March 1969').dates().json())
