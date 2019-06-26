var nlp = require('./src/index')
nlp.extend(require('./plugins/values/src'))

let doc = nlp(`i weigh 95 kilograms and seventeen times`)

doc
  .values()
  .toNumber()
  .debug()
