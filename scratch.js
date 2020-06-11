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

const context = {
  today: '1992-04-03',
  casual_duration: { weeks: 2 },
}

// console.log(nlp('5 to 7 of january 1998').dates(context).json())
console.log(nlp('jan 1921').dates(context).json())
// console.log(nlp('3rd of March').dates(context).json())
// console.log(nlp('March 18th').dates(context).json())
// console.log(nlp('March 18th').dates().json())
// console.log(nlp('3rd of March 1969').dates().json())
