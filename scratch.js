const nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/sentences/src'))
// nlp.extend(require('./plugins/numbers/src'))

// let doc = nlp('i worked at the F.B.I')
// doc = doc.match('(#Acronym|#Abbreviation)').replaceWith(d => {
//   return d
// })
// doc.debug()

//
let doc = nlp('cat, boy, and chair')
doc.nouns().toPlural()
console.log(doc.text())
