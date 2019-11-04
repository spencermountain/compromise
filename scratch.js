const nlp = require('./src/index')
// nlp.verbose(true)
nlp.extend(require('./plugins/adjectives/src'))
// nlp.extend(require('./plugins/verbs/src'))

let doc = nlp('Lekfjs District')

doc.match('@titleCase+ (district|foo)').tag('Region', 'foo-district')
//District of Foo
doc.debug()
// console.log(doc.adjectives().toAdverb())

// let json = doc.export()
// console.log(JSON.stringify(json, null, 2))
