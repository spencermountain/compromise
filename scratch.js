var nlp = require('./src/index')
// nlp.extend(require('./plugins/values/src'))

var m = nlp('spencer kelly is here')
  .match('spencer kelly')
  .delete('spencer')
m.debug()
