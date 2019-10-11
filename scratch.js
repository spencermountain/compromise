const nlp = require('./src/index')
// const corpus = require('nlp-corpus')
// nlp.verbose(true)
// nlp.extend(require('./plugins/output/src'))
// nlp.extend(require('./plugins/paragraphs/src'))
// nlp.extend(require('./plugins/sentences/src'))

let str = `left side. middle part one. two middle part two. right side.`
let doc = nlp(str)
doc.if('middle').join()
doc.debug()
