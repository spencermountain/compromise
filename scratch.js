const nlp = require('./src/index')
// nlp.extend(require('./plugins/numbers/src'))
nlp.extend(require('./plugins/dates/src'))
// nlp.extend(require('./plugins/match-runner/src'))
// const text = require('/Users/spencer/mountain/compromise/scripts/perf/flame/_sotu-text.js')
// nlp.verbose()

// let list = [
//   // ==== Holiday ====
//   { match: '#Holiday (day|eve)', tag: 'Holiday', reason: 'holiday-day' }, // the captain who

//   // ==== WeekDay ====
//   // sun the 5th
//   { match: '[sun] the #Ordinal', tag: 'WeekDay', reason: 'sun-the-5th' },
//   //sun feb 2
//   { match: '[sun] #Date', group: 0, tag: 'WeekDay', reason: 'sun-feb' },
// ]

// let doc = nlp('3-4').debug()
let doc = nlp('3-4pm').debug()
// doc.matchRunner(list)
// doc.debug()
// nlp(text)

// const reg = /(?:^|\s)([\!\[\^]*(?:<[^<]*>)?\([^\)]+[^\\\)]\)[\?\]\+\*\$~]*)(?:\s|$)/g

// let str = '(one two) (upto) snooz(et)oDate'
// console.log(str.split(/(\(.*?\))/))
// console.log(str.split(/(?:^|\s)([\!\[\^]*\(.*?[^\\\)]\)[\?\]\+\*\$~]*)(?:\s|$)/))
// console.log(str.split(/(?:^|\s)([\!\[\^]*(?:<[^<]*>)?\([^\)]+[^\\\)]\)[\?\]\+\*\$~]*)(?:\s|$)/))
// console.log(nlp.parseMatch('(snooze|wait|delay|punt|later|sleep) (up to) [<snooze_to>#Date+]'))

// const hasLetter = /[a-z0-9\u00C0-\u00FF\u00a9\u00ae\u2000-\u3300\ud000-\udfff]/i
// const hasLetter = /[\p{Letter}\d]/u
// const hasLetter = /\p{Word}/u
// let str = ' ę'
// console.log(hasLetter.test(str))
