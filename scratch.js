var nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/values/src'))

// var m = nlp(`jamie's bite`) //.debug()

var doc = nlp('it was cold')
doc.tag('#One #Two #Three')
// doc.tag(['#One', '#Two', '#Three'])
doc.debug()
