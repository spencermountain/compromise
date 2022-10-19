/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// console.log(nlp.world().methods.two.transform)
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)
// nlp.verbose('tagger')
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
  "Police say they have nothing to go on.",
  "proper adjustment, depending upon the character of the general effect.",
  "I'm glad that we stopped kissing the tar on the highway",
  "MHC",
  "I've been \"trying it\" for months now.",
  "Dear dear I reach home le!",
  "Heat waves, droughts, wildfires, and floods – all are now more frequent and intense.",
  "Click and drag the “aether” and “gilded-games-util” .jar files from your desktop and into the Minecraft folder.",
  "Between the hepatocyte plates are liver sinusoids, which are enlarged capillaries through which blood from the hepatic portal vein and hepatic artery enters via the portal triads, then drains to the central vein.",
  "But, the wings are cooked in soy!",
  "If you can trust me with this cross till to-morrow, Rosina, I should like to have it examined and analysed.",
  "Are you, are you, are you sure it’s ah, a new bump?",
  "OF FOOTBALL AND DIL CHAHTA HAI",
  "In chapter 8, this tribe of Israelites is appointed to work in the tabernacle",
  "As Mr Peanut left his house, he said to his wife, \"see you, I'll be back in a Jif",
  "sensible forms for the purpose of conveying a particular meaning.",
  "He watches, lurking beneath the sea",
  "Brandee",
  "Only somewhat related: I wonder sometimes if simile and analogy resonate or mean as much to some people.",
  "Ya had just now.",
  "To cut through the barriers of hateful propaganda, the Voice of America and other broadcast services are expanding their programming in Arabic and Persian - and soon, a new television service will begin providing reliable news and information across the region.",
  "Ask your sponsor to sign a DD FORM 1172-2.",
  "The modern adventure novel goes back to Daniel Defoe's Robinson Crusoe (1719) and its immediate successors.",
  "They have a couple tables where you can eat there too if you want.",
  "But we keep his Majesty the Inca waiting, said Prigio.",
  "MONICA: No, I will not cave.",
  "Patients made to vanish on Malaria Day",
  "Stances include regular, goofy foot & this one that angles the toes of both feet in opposite directions",
  "I failed my audition as Romeo through a misunderstanding over a stage direction.",
  "She was a oneyer, if you like, sir",
  "Life's a schoolyard, I ain't gettin' picked last (oh oh)",
  "Jane",
  "I've *never* been able to shop at all the \"cute\" stores - Abercrombie, Hollister, Aeropostale, American Eagle..all those places that seem like such a big deal when you're in junior high and high school.",
  "He got in touch with me last night and wants me to meet him today at 2 pm",
  "I respect that part of our culture; I grew up in it.",
  "Check with your state and local governments.",
]

// let doc = nlp("he said I am a boy, so far")
let i = 14
let txt = arr[i]
txt = 'so lentils, or pasta for your sauce'
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