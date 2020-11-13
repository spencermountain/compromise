const nlp = require('./src/index')
// const spacetime = require('/Users/spencer/mountain/spacetime/src')
// nlp.verbose(true)
// let txt = require('./scripts/test/speed/_sotu-text.js')
nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))
// nlp.extend(require('./plugins/phrases/src'))

// let doc = nlp(`1st weekend of october 2020`)
// doc.debug()
// // let today = [2016, 1, 5] // a friday
// let obj = doc.dates({}).json()[0]
// // console.log(obj)
// console.log(spacetime(obj.date.start).format('{nice-day} {year} {time}'))
// console.log(spacetime(obj.date.end).format('{nice-day} {year} {time}'))

let doc = nlp(`By the time it was over, Bush had served nearly two years.`)
// doc.phrases()
// doc.json({ terms: { normal: true } })
console.log(doc.json({ terms: { normal: true } })[0].terms)
// console.log(nlp(`before\xa0after`).json()[0].terms[0])
// console.log(nlp(`before after`).json()[0].terms[0])
// console.log(nlp(`before​ after`).json()[0].terms[0])

// var userInput = 'a\u200Bb\u200Cc\u200Dd\uFEFFe'
// console.log(userInput.length) // 9
// var result = userInput.replace(/[\u200B-\u200D\uFEFF]/g, '')
// console.log(result.length) // 5
