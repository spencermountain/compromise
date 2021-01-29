const nlp = require('./src/index')
// nlp.verbose(true)

//
//
//
//
//
//
//

const doc = nlp('he is from Phoenix AZ')
const m = doc.match('#City')
let reg = nlp.parseMatch(m)
console.log(JSON.stringify(reg, null, 2))
doc.match(reg).debug()
//  doc.not(m).debug()

// let doc = nlp('if so, he is the best, that i see. he is the greatest')
// let m = doc.match('he is the .')
// let reg = nlp.parseMatch('cool id')
// doc.match(reg).debug()
