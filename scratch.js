const nlp = require('./src/index')
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))
nlp.extend(require('./plugins/match-runner/src'))
const text = require('/Users/spencer/mountain/compromise/scripts/perf/flame/_sotu-text.js')

// let list = [
//   // ==== Holiday ====
//   { match: '#Holiday (day|eve)', tag: 'Holiday', reason: 'holiday-day' }, // the captain who

//   // ==== WeekDay ====
//   // sun the 5th
//   { match: '[sun] the #Ordinal', tag: 'WeekDay', reason: 'sun-the-5th' },
//   //sun feb 2
//   { match: '[sun] #Date', group: 0, tag: 'WeekDay', reason: 'sun-feb' },
// ]

// let doc = nlp('no one tunes into their 2nd favourite no-radio station. no lyin!')
// doc.matchRunner(list)
// doc.debug()
// nlp(text)

// const reg = /(?:^|\s)([\!\[\^]*(?:<[^<]*>)?\([^\)]+[^\\\)]\)[\?\]\+\*\$~]*)(?:\s|$)/g

// let str = '(one two) (upto) snooz(et)oDate'
// console.log(str.split(/(\(.*?\))/))
// console.log(str.split(/(?:^|\s)([\!\[\^]*\(.*?[^\\\)]\)[\?\]\+\*\$~]*)(?:\s|$)/))
// console.log(str.split(/(?:^|\s)([\!\[\^]*(?:<[^<]*>)?\([^\)]+[^\\\)]\)[\?\]\+\*\$~]*)(?:\s|$)/))
// console.log(nlp.parseMatch('(snooze|wait|delay|punt|later|sleep) (up to) [<snooze_to>#Date+]'))
