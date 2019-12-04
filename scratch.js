const nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/sentences/src'))
// nlp.extend(require('./plugins/numbers/src'))

let str = 'text—text'
let doc = nlp(str)
// console.log(doc.termList()[0].post === '-')
// console.log(doc.text())
console.log(doc.text() === str)
// const sen = r.sentences().data()
// console.log(sen)
