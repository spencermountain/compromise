const nlp = require('./src/index')
// const spacetime = require('/Users/spencer/mountain/spacetime/src')
// nlp.verbose(true)
// let txt = require('./scripts/test/speed/_sotu-text.js')
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))
let fn = require('./plugins/strict-match/src').plugin
let preParser = require('./plugins/strict-match/src').preParser
nlp.extend(fn)
// nlp.extend(require('./plugins/phrases/src'))

// let doc = nlp(`1st weekend of october 2020`)
// doc.debug()
// // let today = [2016, 1, 5] // a friday
// let obj = doc.dates({}).json()[0]
// // console.log(obj)
// console.log(spacetime(obj.date.start).format('{nice-day} {year} {time}'))
// console.log(spacetime(obj.date.end).format('{nice-day} {year} {time}'))

// const r = nlp('Last Updated: 02/28/2020 03:00 pm ')
//   .debug()
//   .dates()
//   .format('{month} {date-ordinal} {year} {time}')
//   .debug()
//   .out('array')
// console.log(r)

// let doc = nlp('Julie de Bussy')
// doc.strictMatch('#FirstName [(van|von|de|du)] #LastName').debug()

const regex = preParser('(?P<greeting>hi|hello|good morning) #Noun')
// or: const regex = nlp.compileRegex('(?P<greeting>hi|hello|good morning) #Noun');
// or: const regex = doc.compileRegex('(?P<greeting>hi|hello|good morning) #Noun');
// console.log(regex)
let doc = nlp('hello world').strictMatch(regex).groups('greeting')
// console.log(doc.text())
