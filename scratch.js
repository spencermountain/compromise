const nlp = require('./src/index')
let txt = require('./scripts/test/speed/_sotu-text.js')
// nlp.verbose(true)
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/scan/src'))

// nlp(`okay, do not use reverse psychology`).debug()
// nlp(`April, June, and September`).debug()
// nlp(`among them the ones at HUD`).debug()

// console.time('all')
// nlp(txt) //.debug()
nlp('i went to Phoenix AZ today')
  // .match([{ tag: 'City' }, { named: 0, groupType: 'single', word: 'az' }])
  .debug()
// console.timeEnd('all')

// (the|those|these) #Adjective? [#PastTense]
// (#WeekDay|#Month) #Value
