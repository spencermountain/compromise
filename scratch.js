const nlp = require('./src/index')
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))
nlp.extend(require('./plugins/sentences/src'))
// nlp.verbose(true)

//
// '3/8ths'
// 'three eighths of -'
// '- and three eighths'
// 'three out of eight'
//

// complex denominators - 'one fifty fourths', 'one thirty third'
//

// let doc = nlp('i should drive')
// doc.sentences().toPastTense().debug()

// let doc = nlp(`shut the door`).debug()
// let doc = nlp(`do you eat?`) //.debug()
let doc = nlp(`the service is fast`).debug()

// let vb = doc.verbs().clone(true)
// vb.sentences().debug()
// doc.verbs().isImperative().debug()
// doc.sentences().toPastTense().debug()

// console.log(doc.dates().get())
// console.log(doc.durations().get(0))

// possible match-bug:
// let doc = nlp(`go fast john!`).debug()
// s.has('^#Infinitive #Adverb? #Noun?$')
