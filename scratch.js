/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
import plg from './plugins/paragraphs/src/plugin.js'
nlp.plugin(plg)
let txt = ''
// let doc
// let m

// nlp.verbose('tagger')


// let doc = nlp('When Dona Valeria finds out that Fernando Jose is in a relationship, she gets mad at her son for dating someone beneath their social status')
// doc.compute('coreference')



// bug 3
// let doc = nlp("Dr. John Smith-McDonald...")
// let opts = {
//   keepPunct: false,
//   abbreviations: false,
//   case: false,
// }
// console.log(doc.text(opts))



// const doc = nlp("foobar. he was demanding his rights after. walking his plank after")
// let net = nlp.buildNet([{ match: 'his .', ifNo: ['demanding', 'rights'] }])
// doc.match(net).debug()




let arr = [


  // "UPDATE: /u/Averyhonestguy has raised a very sobering point",
  // "Bike Share rolls out Pride themed bikes in New York",
  // "C'mon, Luisa, you have a chance to be the bigger person here!",
  // "Do quick and easy exercises at home.",
  // "Determine whether you have the necessary qualities for the profession.",
  // "Be sure to say goodbye to the interviewers before you leave.",
  // "Make room for flexibility in your schedule.",
  // "Reduce medications during less stressful periods.",
  // "Focus on her qualities and accomplishments",
  // "Sweeten baked goods.",

  // "After my first class on a Wednesday i knew id be sore.",
  // "without the least reserve.",
  // "If you turn me on to anything",
  // "Consider the track record of the manufacturer and any previous experience with them or their consoles, also remember to consider reliability issues with either console",
  // "government-funded research",
  // "lifeguard patrolled beaches",
  // "Pride themed bikes",
  // "Tell Monica I say goodbye.",
  // "Reading ARP related article lor.",


  `If you notice swelling`,
  `and whisk to fully incorporate`,
  `Going shopping alone`,
  `when the killer strikes`,
  `Your refusal may cause hurt and disappointment`,
  'Carpenter\'s one year of coaching',
  `Holly objects to Nia's character`,
  ' visa & travel assistance',
  'Let the dishwasher run for an entire cycle',
  'by encouraging carpooling',
  'Ohio beaver trapping season starts in late December ',

  'We Personally Guarantee Everything We Sell',
  'we personally guarantee',
  // 'unless we win',
  // 'and we offer',
  "method for measuring",
  "responsibility for setting",
  "Attack and resolve your issues",


]


txt = arr[0]

txt = `What's with these homies dissin' my girl? Why do they gotta front? What did we ever do to these guys that made them so violent?

Second paragraph! Oh yeah! my friends
`

let doc = nlp(txt)
// doc.debug()
console.log(doc.paragraphs().has('my girl'))

// doc.verbs().debug()
// console.log(doc.sentences().json()[0].sentence)

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