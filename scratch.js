const nlp = require('./src/index')
// nlp.verbose(true)

//
//
//
//
//
//
//

let doc = nlp('before three farms after')
let reg = nlp.parseMatch(`before (#Value .) after`)
// console.log(JSON.stringify(reg, null, 2))
doc.match(reg).debug()
