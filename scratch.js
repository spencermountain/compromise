const nlp = require('./src/index')
// const spacetime = require('/Users/spencer/mountain/spacetime/src')
nlp.verbose(true)
// let txt = require('./scripts/test/speed/_sotu-text.js')
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))
// nlp.extend(require('./plugins/sentences/src'))

// let doc = nlp(`before 2017`)
// // let doc = nlp(`last week`)
// let february = 1
// let today = [2016, february, 5] // a friday
// // let doc = nlp(`sunday`)
// doc.debug()
// // let doc = nlp(`a year ago`)
// let obj = doc.dates({ today: today }).json()[0]
// console.log(spacetime(obj.date.start).format('{nice-day} {year}'))

// let doc = nlp(`i have got to`)
// let doc = nlp(`i am nice, he really drive`)
// let doc = nlp(`john will drive the car!`)

let doc = nlp('1235-1234').debug()
// let doc = nlp('i should be driven')
// let doc = nlp('i should drive')
// let doc = nlp('i should have been driven')
// doc.verbs().toPastTense()
// doc.verbs().toFutureTense()
// doc.debug()
// doc.verbs().toFutureTense().debug()

// let doc = nlp(`Japan 'Twitter killer' pleads guilty to murders`)
// let doc = nlp(`pleads`)
// doc.nouns().debug()
// let m = doc.verbs().subject().debug()
// console.log(m)
// m.lookBehind().nouns(null, { keep_anaphora: true }).last().debug()

// doc.debug()
// doc.verbs().toPastTense()
// console.log(doc.text())

/*
i pronounce it to be
i've got to 
when it's raining
don't speak
*/
