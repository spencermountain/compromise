var nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/values/src'))

let str = `Haha take care. ü`
var doc = nlp(str)
doc.debug()
