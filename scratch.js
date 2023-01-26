/* eslint-disable no-console, no-unused-vars */
import nlp from './src/four.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

nlp.verbose('tagger')

let arr = [
  // "New restaurant organizes their menu by feelings",
  // "a state implemented voting to increase their total",
  "give our people the tools they need",
  'I have also heard rumors that drivers save on gas when they idle',
  'when I looked at my girlfriend her head would grow and shrink',
  'before any of the ladies of the Court could stop him he spoke',
  `was very well pleased with the magician's conduct, and said to her`,
  'Men are of different heights, yet they range about a mode',
  'the committee gathered their delegates',
  'the leverage of Brussels over new member states increases after they join'
]
// let doc = nlp(arr[0]).debug()

// // doc.nouns().debug()
// console.log('from:')
// let pron = doc.pronouns().debug()

// console.log('to:')
// pron.refersTo().debug()


// .nouns() issues
// arr = [
// `1 of these carried a Kansas woman 60 ft., dropping her `,
// ]
// let doc = nlp(arr[0]).debug()
// doc.nouns().debug()

// japanese punctuation
// 「」
// 『』
// 【】
// let txt = "皆さんこんにちは、トウフグのコウイチでございます。ハロー！" //comma
// txt = "ザー・モンキー"//interpunct
let txt = "the bartender laughed, he was funny"//interpunct
txt = 'air traffic controller'
txt = 'Respiratory Therapist '
// txt = "少年は店に向かった。 彼はパンを買った。"
nlp(txt).debug()
