/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)
nlp.verbose('tagger')
// let txt = ''
// let doc
// let m

// bug 1
// doc = nlp('we swim')
// console.log(doc.verbs().conjugate())

// bug 2
// doc = nlp('blew').debug()
// console.log(doc.verbs().conjugate())

// bug 3
// doc = nlp(' 18e').debug()



// const text = `Remove me 1:
// - A some text
// - B some text
// - C some text`

// const doc = nlp(text)
// doc.match('Remove me #NumericValue').forEach((m) => doc.remove(m))
// doc.match('* some text$').forEach((m) => m.prepend('prefix'))
// console.log(doc.out())

// const txt = `before Remove 500mg of paracetamol`
// const doc = nlp(txt)
// doc.remove('Remove')
// console.log(doc.text())

// let doc = nlp('i strolled downtown')
// doc.match('{stroll}')
// nlp.parseMatch('{stroll}')
// doc.swap('stroll', 'walk')

// console.log(nlp.parseMatch('{kiss/verb}'))

// const doc = nlp("These are the old-fashioned dilemmas").debug()
// const doc = nlp("foobar. he was demanding his rights after. walking his plank after")
// let net = nlp.buildNet([{ match: 'his .', ifNo: ['demanding', 'rights'] }])
// doc.match(net).debug()




let arr = [
  // "Stances include regular, goofy foot & this one ",
  // "He got in touch with me last night and wants me to meet him today at 2 pm",
  // "Life's a schoolyard, I ain't gettin' picked last",
  // "I've tried the flautas, enchiladas, and juevos rancheros and while none of them were the absolute best mexican dishes I've ever had, I was not disappointed at all.",
  // "St. Nicholas shall leave the helm and that the only cargo shall be black cats.",
  // "we need the fastest, most reliable ways .",
  // "A moment later, he dropped the phone, walked to the other room, and started crying so hard.",
  "Surely fire is warm enough already?..",
  "consented to take off his own.",
  "And I bought the shoes that just walked out on me",
  "Bill",
  "Why are there people that doubleclick?",
  "Anyway we r movin off now only lor.",
  "Legislation to achieve excellence in education, building on the partnership forged with the 50 governors at the education summit, enabling parents to choose their children's schools and helping to make America No.",
  "Type the cheat in the message bar a second time and press Enter to disable it (unless it is a cheat that changes the amount of lumber/gold/oil you have).",
  "In Watt's conception, a rise in fictional realism during the 18th century came to distinguish the novel from earlier prose narratives.",
  "This is now my favorite restaurant in Portland, and I've been some great ones before now.",
]

// let doc = nlp("he said I am a boy, so far")
let i = 0
let txt = arr[i]
let doc = nlp(txt)
console.log(doc.text())
doc.clauses().debug()
// console.log(doc.sentences().json())

// [ { form: 'simple-present', tense: 'PresentTense', copula: true } ]

// let doc = nlp(`Remove me 1. A some text. B some text. C some text`)
// console.log(doc)
// doc.match('Remove me 1').forEach((m) => doc.remove(m))
// console.log(doc)
// // let res = doc.match('* some text$').prepend('prefix')
// doc.match('* some text$').forEach(m => m.prepend('prefix'))
// doc.all()
// console.log(doc)
// console.log(doc.text())//`Prefix A some text. Prefix B some text. Prefix C some text`
// console.log(doc.text() === `Prefix A some text. Prefix B some text. Prefix C some text`)

// console.log(doc.verbs().conjugate())
// console.log(doc.verbs().toGerund().text())


// date issues:
// 'the month before christmas' vs 'a month before christmas'
// middle september
// end of september
// first half of march
// week of june 3rd
// fridays in june
// every saturday
// now
// until christmas