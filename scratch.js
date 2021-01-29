const nlp = require('./src/index')
// nlp.verbose(true)

//
//
//
//
//
//
//

let doc = nlp('i was shocked')
let reg = nlp.parseMatch(`[#Copula] (#PastTense)`)
console.log(JSON.stringify(reg, null, 2))
doc.match(reg, 0).debug()
