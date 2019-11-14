const nlp = require('./src/index')
// nlp.verbose(true)
nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))

// text
// normal
// clean
// reduced
// root

let doc = nlp(`Toronto's citizens love toronto!`)
console.log(doc.out('freq'))

// let doc = nlp(`My dog loves Pizza. He was nice.`)
// console.log(doc.text('root'))
// console.log(doc.json({ normal: true, clean: true, reduced: true, root: true, terms: false })[0])
