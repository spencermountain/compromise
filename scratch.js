var nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/verbs/src'))
// nlp.extend(require('./plugins/entities/src'))

nlp('Phoenix AZ')
  .debug()
  .match('#City #Region')
  .debug()

// nlp('june and today cool')
//   .match('(#Date && today)')
//   .debug()
