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
let reg = nlp.parseMatch(`[#Copula] (#PastTense|shocked)`)
// console.log(JSON.stringify(reg, null, 2))
doc.match(reg, 0).debug()

// let reg = nlp.parseMatch('a [(football|walk|climb)]', { fuzzy: 0.7 })
// console.log(JSON.stringify(reg, null, 2))
// nlp('a foobtall').match(reg, 0).debug()
