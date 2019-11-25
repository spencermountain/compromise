const nlp = require('./src/index')
// nlp.verbose(true)
nlp.extend(require('./plugins/dates/src'))
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

// .toQuotation()
// .toParentheses()

// let doc = nlp('Tony is, i think').contract()
// console.log(doc.text())

let doc = nlp('Thurs, Feb 2nd, 2016')
doc.match('feb').replaceWith(m => {
  return m.text({ trim: true }) + '!'
})
// doc.debug()
console.log(doc.text())
