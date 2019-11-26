const nlp = require('./src/index')
// nlp.verbose(true)
nlp.extend(require('./plugins/sentences/src'))
// nlp.extend(require('./plugins/numbers/src'))

// let doc = nlp(`i walked to the moon when it was shining`)
// doc.verbs().forEach(d => {
//   d.matchOne('walked').replaceWith('sat')
// })
// doc.sentences().toPastTense()
// doc.debug()

// let doc = nlp.tokenize(`between june 5th and june 7th`)
// doc.match('between [#Date+] and').debug()
// doc.match('between [.*] and').debug()

let d = nlp(`i am good`)
let s = d.sentences()

// s.debug()
// s.from.debug()
// console.log(s.parents())

s.replace('am', 'was')
// d.replace('am', 'was')
console.log(d)
d.debug()
// console.log(d.parents()[0].)
// console.log(r.list)
// console.log(d.text())
