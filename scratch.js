/* eslint-disable no-console, no-unused-vars */
import nlp from './src/one.js'
// import nlp from './builds/compromise.cjs'
// nlp.verbose('tagger')

// bug!
// let doc = nlp(`extra. match.`)
// let m = doc.match('match').freeze()
// doc.remove('extra')
// doc.match(m).debug()

// bug!
// let doc = nlp(`john walks`)
// let s = doc.sentences()
// s.toFutureTense().fullSentences()
// console.log(s)
// console.log(s.text())


let txt
// txt = `repurchase the milk`
// txt = `they too failed`

// txt = `yoga and horses`
// txt = `to probe and alter`
// txt = `the city and surrounding area`
// txt = `the Senate's composition and powers`
// txt = `small twigs & stems`
// txt = `the winds and storms`
// txt = `collection of odds and ends`

// txt = `what are you up to`
// txt = `up to date`
txt = `Great name for it`
// txt = `read these reviews and improved!`
// txt = `has soft music playing.`
// txt = `it is always clean.`
// txt = `with guns, cash and drugs`
// txt = `Stock prices closed higher`
// txt = ` bump us up to first class`

// txt = `10 markets and pop-ups`
// txt = `fruit danishes as well`
// txt = `SNAP is right in part`
// txt = `business models for transmission `


// let doc = nlp(txt)
// doc.debug()


let arr = [
  `Toronto Aeros`,
  `Toronto Arenas`,
  `Toronto Aura Lee`,
  `Toronto 228th Battalion (NHA)`,
  `Toronto Blueshirts`,
  `Toronto Jr. Canadiens`,
  `Dixie Beehives (2005–11)`,
  `East York Lyndhursts`,
  `Toronto Granites`,
  `Toronto Knob Hill Farms`,
  `Toronto Lions`,
  `Toronto Maple Leafs`,
  `Toronto Marlboros`,
  `Toronto Marlies`,
  `Mimico Monarchs`,
  `Toronto Native Sons`,
  `Niagara-on-the-Lake Predators`,
  `North York Rangers`,
  `North York Rangers (1967–1984)`,
  `Toronto Ontarios`,
  `Toronto Professional Hockey Club`,
  `Toronto Ravinas`,
  `Toronto Roadrunners`,
  `Royal York Royals`,
  `Toronto St. Patricks`,
  `Toronto Shamrocks`,
  `St. Michael's Buzzers`,
  `Toronto Tecumsehs`,
  `Toronto Toros`,
  `Toronto Attack`,
  `Toronto Furies`,
  `Toronto Jr. Aeros`,
  `Toronto Neil McNeil Maroons`,
  `Toronto Patriots`,
  `Toronto Six`,
  `Toronto St. Michael's Majors`,
  `Toronto Varsity Blues men's ice hockey`,
  `Torontos`,
  `Toronto Wellingtons`,
  `West Toronto Nationals`,
  `Toronto Young Rangers`,
]

// arr = [
//   // `Toronto`,
//   `Toronto Rangers`,
//   `Toronto marlies`,
// ]


let doc = nlp('one two three four five. Toronto marlies. foobar')
doc.match('marlies').debug()
// console.log(nlp.hooks())
// let m = doc.match('(two|four) (three|five)').debug()
// console.log(m)
// m.settle().debug()

let trie = nlp.compile(arr)
doc.lookup(trie).debug()

// txt = `i was there`
// txt = `say it again`
// txt = `waiters are furious`
// txt = `this union has disrupted`
// let doc = nlp(txt)
// doc.verbs().debug()
// doc.sentences().toPast()
// doc.sentences().toFuture()
// doc.sentences().toPresent()
// doc.debug()


// let arr = [
//   ["recreated", "recreate"],
//   ["postponed", "postpone"],
//   ["pondered", "ponder"],
//   ["boned", "bone"],
// ]
// let doc = nlp(arr[arr.length - 1][0]).debug()
// doc.verbs().toInfinitive()
// console.log(doc.text())


// bug 1
// txt = `he out-lived`
// txt = `he out lived`
// txt = `pseudo clean`
// txt = `he was anti cleaning`
// // txt = `he was anti cleaning`
// let doc = nlp(txt)
// console.log(doc.verbs().json()[0])
// doc.verbs().toFutureTense()
// doc.debug()



/*










*/
