const nlp = require('./src/index')
// const nlp = require('./')
nlp.verbose(true)
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))

// nlp('WE’RE NOT WORTHY!').debug()
nlp('contacted nbc').debug()
