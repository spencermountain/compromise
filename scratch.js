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

// let doc = nlp(`By the time it was over, Bush had served nearly two years.`)
// doc.phrases()

let doc = nlp.tokenize('one two three')
let m = doc.match('one !foo two three')

doc = nlp.tokenize('one two three')
m = doc.match('one !foo three')

doc = nlp.tokenize('one two three')
m = doc.match('one !foo two')

m.debug()
// doc.numbers().toNumber()
// console.log(doc.text())
