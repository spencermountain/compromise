var nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/values/src'))

var doc = nlp(`jamie's run`)
doc.debug()
