const nlp = require('./src/index')
// const corpus = require('nlp-corpus')
// nlp.verbose(true)
// nlp.extend(require('./plugins/output/src'))
nlp.extend(require('./plugins/verbs/src'))
nlp.extend(require('./plugins/nouns/src'))
// nlp.extend(require('./plugins/paragraphs/src'))

/*
2. ~walk~ match
3. .swap()
*/

let doc = nlp(`a priest walked into the bars`)
doc.cache({ root: true })
// doc.match('~walking~').debug()
doc.match('~bar~').debug()
