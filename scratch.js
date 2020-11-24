const nlp = require('./src/index')
const spacetime = require('/Users/spencer/mountain/spacetime/src')
nlp.verbose(true)
nlp.extend(require('./plugins/sentences/src'))
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))
const intersection = function (arr1, arr2) {
  return arr1.filter(value => arr2.includes(value))
}

let female = require('/Users/spencer/mountain/compromise/data/people/femaleNames.js')
let male = require('/Users/spencer/mountain/compromise/data/people/maleNames.js')
let both = require('/Users/spencer/mountain/compromise/data/people/firstNames.js')
let last = require('/Users/spencer/mountain/compromise/data/people/lastNames.js')
let people = require('/Users/spencer/mountain/compromise/data/people/people.js')

console.log(intersection(last, people))
// const fmt = function (iso) {
//   if (!iso) {
//     return '-'
//   }
//   return spacetime(iso).format('{day-short} {nice} {year}')
// }

// let doc = nlp('first hour of 2019')
// let found = doc.dates().json()[0]
// console.log(fmt(found.date.start))
// console.log(fmt(found.date.end))

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
// let doc = nlp('Wilson was claiming that he had been working for the CIA when he sold the C - 4 to Quaddaffi.')

// let doc = nlp(`alexandria Daddario`).debug()
// let doc = nlp(`Paris Berelc`).debug()
// let doc = nlp(`in alexandria`).debug()
// doc.debug()
// doc.sentences().forEach(s => {
//   s.phrases().debug()
// })
