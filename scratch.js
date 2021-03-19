const nlp = require('./src/index')
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))
nlp.extend(require('./plugins/match-runner/src'))

let list = [
  // ==== Holiday ====
  { match: '#Holiday (day|eve)', tag: 'Holiday', reason: 'holiday-day' }, // the captain who

  // ==== WeekDay ====
  // sun the 5th
  { match: '[sun] the #Ordinal', tag: 'WeekDay', reason: 'sun-the-5th' },
  //sun feb 2
  { match: '[sun] #Date', group: 0, tag: 'WeekDay', reason: 'sun-feb' },
]

let doc = nlp('no one tunes into their 2nd favourite radio station')
doc.matchRunner(list)
doc.debug()
