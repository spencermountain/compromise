const nlp = require('./src/index')
nlp.extend(require('./plugins/numbers/src'))
nlp.extend(require('./plugins/dates/src'))
// nlp.extend(require('./plugins/typeahead/src'))
// nlp.extend(require('./plugins/sentences/src'))
// nlp.verbose(true)

// require('/Users/spencer/mountain/timezone-soft/data/metazone/index.js').forEach(obj => {
//   let doc = nlp(obj.std.abbr)
//   if (!doc.has('(#Place|#Timezone)')) {
//     console.log(obj.std.abbr)
//   }
// })
let doc = nlp('3pm OMST').debug()
