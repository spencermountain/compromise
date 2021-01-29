const nlp = require('./src/index')
// nlp.verbose(true)

//
//
//
//
//
//
//
const doc = nlp('he is from Phoenix')
const m = doc.match('#City')
let reg = nlp.parseMatch(m)
// let reg = nlp.parseMatch('(#City)')
console.log(JSON.stringify(reg, null, 2))
doc.match(reg).debug()
// let terms = doc.termList()
// console.log(terms[terms.length - 1])
// const without = doc.not(m).debug()
// let doc = nlp('is really not quickly walking')
// doc.match(reg).debug()
