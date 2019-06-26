var nlp = require('./src/index')
// nlp.extend(require('./plugins/values/src'))

let doc = nlp(`i really try it`)

console.log(doc.delete('really').out()) //.debug()
// doc.replace('try', 'did').debug()

// doc
//   .values()
//   .toNumber()
//   .debug()
