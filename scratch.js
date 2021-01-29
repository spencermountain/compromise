const nlp = require('./src/index')
nlp.verbose(true)

//
//
//
//
//
//
//

let doc = nlp("matt does but matthew doesn't")
let reg = nlp.parseMatch('(^#Person|#Person$)')
console.log(JSON.stringify(reg, null, 2))
doc.match(reg).debug()
