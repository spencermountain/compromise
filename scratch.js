var nlp = require('./src/index')
nlp.verbose(true)
// nlp.extend(require('./plugins/values/src'))

//TODAY: finish tagger:
// then rename values() to numbers()

let doc = nlp('cool-move').debug()
