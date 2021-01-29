const nlp = require('./src/index')
const spacetime = require('/Users/spencer/mountain/spacetime/src')
// nlp.verbose(true)
nlp.extend(require('./plugins/numbers/src'))
nlp.extend(require('./plugins/dates/src'))

// const fmt = iso => (iso ? spacetime(iso).format('{day-short} {nice} {year}') : '-')
// const context = {
//   today: '2020-01-21',
//   timezone: 'Canada/Pacific',
// }

// let doc = nlp('2mins from now') //.durations().debug()
// console.log(doc.durations().json())
// doc.durations().normalize()
// doc.debug()
// console.log(doc.text())

// nlp('foo foot gun baz').match('foo (foot gun|shoe)? baz').debug()
// nlp('foo shoe baz').match('foo (foot gun|shoe)? baz').debug()

// let doc = nlp('03/02').debug()
// let dates = doc.dates(context).json()[0]
// console.log('start: ', fmt(dates.date.start))
// console.log('  end: ', fmt(dates.date.end))

let doc = nlp('june and july cool').debug()
doc.match('(#Date && july)').debug()

// let doc = nlp('it is waaaay cool').debug()
let reg = nlp.parseMatch('(#Date && july)')
// console.log(reg)
// doc.match(reg).debug()

// doc.match('a (football|walk|climb)', { fuzzy: 0.74 })
// let doc = nlp('the dog played').match('the dog [<target>played]').debug()
// console.log(doc.groups('target'))
// let doc = nlp('spencer is really cool')
console.log(JSON.stringify(reg, null, 2))
// console.log(reg[2])
// let reg = nlp.parseMatch('(spencer|really cool)')
// nlp('hamilton Johnson').match(reg).debug()
// const doc = nlp('he is from Phoenix AZ')
// const m = doc.match('#City')
// doc.match(reg).debug()
// doc.match(m).debug()
// doc.not(m).debug()

// m = doc.match('(@hasPeriod|cool)')
// console.log(reg)
// let reg = nlp.parseMatch('a (football .|cool #Noun)')
// let reg = nlp.parseMatch('a (football|walk|climb)')
// nlp("jamie's much, much better.").match(reg).debug()

// nlp('a talk').match('a (football|walk|climb)', { fuzzy: 0.4 }).debug()

// console.log(nlp.parseMatch('the [(united states|canadian)] senate'))
// nlp('the canadian senate').match('the [(united states|canadian)] senate', 0).debug()
// nlp('the united states senate').match('the (united states|canadian) senate').debug()

// nlp.tokenize('a walk').match('a (football|talk)', { fuzzy: 0.7 }).text()
// 'a walk'

// ==working now==

// ### hmmm
// let doc = nlp('in the next three years') //.debug()
// let doc = nlp(`in an hour from now`) //.debug()
// let doc = nlp(`in half an hour`).debug()
// let doc = nlp(`tomorrow at quarter past 4`).debug()
// let doc = nlp('in 20min').debug()
// doc.match('/^[0-9]+/').tag('Verb').debug()
// doc.values().normalize().debug()
// let doc = nlp('20 mins before tuesday at 3pm').debug()
// let doc = nlp(`3-4pm`).debug()
// let doc = nlp(`5 to 7 of january 1998`).debug()
// let doc = nlp('2005 4th quarter')
// let doc = nlp(`Chanukah 2018`)
// let doc = nlp(`2 thursdays ago`).debug()
// let doc = nlp(`half three`).debug()
// let doc = nlp(`last year`).debug()
// let doc = nlp(`November 18th 2010 midnight`).debug()
// let doc = nlp(`between 9:30 and 11:00 on thursday`).debug()
// let doc = nlp('Jan 1 - Dec 31, 2018') //contraction
// let doc = nlp('by next weekend') // clone issue
// let doc = nlp('nov 1 - nov 30').debug()
// let doc = nlp('this past mon').debug()
// let doc = nlp('this morning').debug() // (forward)
// let doc = nlp('middle of 2019').debug()
// let doc = nlp('middle of 2019').debug()
// let doc = nlp('january up to june').debug()
// let doc = nlp('march 1st 2016 to may 31st 2016').debug()
// let doc = nlp('this winter').debug()
// let doc = nlp('between dec and February').debug()
// let doc = nlp('by tomorrow').debug()
// let doc = nlp('1994-11-05T13:15:30Z').debug()
// let doc = nlp('dec 23rd 2019 to dec 29').debug()
// let doc = nlp('march 1st to may 31st 2017').debug()
// let doc = nlp('sometime during today').debug()
// let doc = nlp('in about one week').debug()
// let doc = nlp('a month and a half from now').debug()

// let doc = nlp('he looked')
// doc.cache({ root: true })
// doc.match('(~look~|walk)').debug()

// let cacheDocss = nlp('She looks amazing. She is strong and most intelligent amongst others.')
// cacheDocss.cache({ root: true })

// #### money-parser
// let doc = nlp('he sent 6 hundred canadian dollars into orbit').debug()
// let doc = nlp('asdf 25% asdf').debug()

// const doc = nlp('allow')
// const doc = nlp('follow')
// const doc = nlp('vow')
// const doc = nlp('grow')
// const doc = nlp('patrol')
// const doc = nlp('guide')
// const doc = nlp('hide')
// const doc = nlp('slide')
// doc.tag('Verb')
// console.log(doc.verbs().conjugate())

// let nlp = require('compromise');
// nlp('foo-bar').match('@hasDash').debug()
// let doc = nlp('you take 11 hours to provide feedback').debug()
// doc.sentences().toPastTense().debug()

// nlp('i will go').match('i will !not go')

// let doc1 = nlp('An 80 year old from Panadura has died')
// let doc3 = nlp('A 79 years old woman from Colombo 13 has died in her r')

// ### time-parser
// let doc = nlp(`a quarter past noon`).debug()
// let doc = nlp(`a quarter to 4`).debug()
// let doc = nlp(`04/2016`).debug()
