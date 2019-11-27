const nlp = require('./src/index')
// nlp.verbose(true)
nlp.extend(require('./plugins/sentences/src'))
nlp.extend(require('./plugins/numbers/src'))

// let doc = nlp(`i walked to the moon when it was shining`)
// doc.verbs().forEach(d => {
//   d.matchOne('walked').replaceWith('sat')
// })
// doc.sentences().toPastTense()
// doc.debug()

// let doc = nlp.tokenize(`between june 5th and june 7th`)
// doc.match('between [#Date+] and').debug()
// doc.match('between [.*] and').debug()

// let doc = nlp('falls over')

let doc = nlp(`i went to sleep`).debug()
let s = doc.sentences()
// s.toPastTense()
// s.toFutureTense()
s.toPresentTense()
doc.debug()
// s.verbs()
// .debug()

//   let doc = nlp('five bottles of beer')
//   doc.values().toOrdinal()
//  console.log( doc.text())
// let doc = nlp.tokenize('let the blossoming of Millhouse begin') //only tokenize, don't tag
// // (doc currently has no tags)
// doc.tagger()
// doc.debug()
// // console.log(doc.match('#Person+').text())
