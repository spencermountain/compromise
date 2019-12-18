const nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))

let str = 'hello 🇵🇷.'
let doc = nlp(str).debug()
console.log(doc.text())
