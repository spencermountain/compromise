var nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/verbs/src'))
// nlp.extend(require('./plugins/entities/src'))

// let doc = nlp('june and today cool')
// doc.match('(#Place .{2,3})').debug()
let doc = nlp('toronto and montreal. Sydney and Paris.')
doc.match('(#Place  | and )').debug()
