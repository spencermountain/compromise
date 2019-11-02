const nlp = require('./src/index')
// nlp.verbose(true)
nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/verbs/src'))

let doc = nlp('two hundred quintillion apples. even more raddish')
let json = doc.export()
console.log(JSON.stringify(json, null, 2))
