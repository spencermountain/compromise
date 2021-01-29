const nlp = require('./src/index')
// nlp.verbose(true)

//
//
//
//
//
//
//

let doc = nlp('is really not quickly walking')
let reg = nlp.parseMatch('is (#Adverb|not)+ walking')
// console.log(JSON.stringify(reg, null, 2))
// doc.match(reg).debug()
