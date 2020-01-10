const nlp = require('./src/index')
nlp.verbose(true)
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))

// nlp('WE’RE NOT WORTHY!').debug()
nlp('fbi').debug()
