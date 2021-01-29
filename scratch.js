const nlp = require('./src/index')
// nlp.verbose(true)

//
//
//
//
//
//
//

let doc = nlp('if so, he is the best, that i see. he is the greatest')
let m = doc.match('he is the .')
let reg = nlp.parseMatch(m)
// let reg = nlp.parseMatch('cool id')
// console.log(JSON.stringify(reg, null, 2))
doc.match(reg).debug()
