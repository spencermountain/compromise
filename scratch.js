const nlp = require('./src/index')
// nlp.verbose(true)
// let txt = require('./scripts/test/speed/_sotu-text.js')
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))

/*
### Tagging:
`in Hillsborough, California`
`based in Creston British Columbia`

### article issues
`'20th-century American'  - .article()  -> a`
`sports people`
``
``
`The Football clubs in Morocco`
`Defunct tennis tournaments in the United States`
`The Expatriate football managers in Georgia `
`rhythm and blues singer-songwriters`
*/

let doc = nlp('in Hillsborough, California')
doc.nouns().toSingular()
doc.debug()
