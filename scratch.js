/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/paragraphs/src/plugin.js'
// nlp.plugin(plg)
let txt = ''
// let doc
// let m

// nlp.verbose('tagger')


// let doc = nlp('When Dona Valeria finds out that Fernando Jose is in a relationship, she gets mad at her son for dating someone beneath their social status')
// doc.compute('coreference')



// bug 3
// let doc = nlp("Dr. John Smith-McDonald?")
// // let doc = nlp("Petsmart application? ")
// let opts = {
//   keepPunct: false,
//   punctuation: 'none',
//   // abbreviations: false,
//   case: false,
// }
// console.log(doc.match('McDonald').text('machine') + '|')


let arr = [
  // "keep a cool head",
  "petsmart application?",
  // "attacked by a bear?",
  // "Gal's DIARY: He ws quiet 2dy.",
  // "All right relax.",
  // "HP to be self-sufficient by 2010",
  // "the woman isn't dead.",
]
arr.forEach(str => {
  let doc = nlp(str)
  doc.nouns().toPlural()
  console.log(doc.text())
})
// let doc = nlp("petsmart application?")
// let m = doc.match('application')
// console.log(doc.text({ punctuation: false }))

// nlp('two turtledoves and a partridge in a pear tree').nouns().isSingular().out('array')

// let doc = nlp('hello there after words')
// let regs = doc.match('(after|words)+').docs[0].map(t => {
//   return { id: t.id, optional: true }
// })
// let m = doc.match('hello there')
// console.log(m.json({ sentence: true }))
// m.growRight(regs).debug()
// console.log(doc.replaceWith('a hoy hoy').text())

// let doc = nlp('hello there')
// console.log(doc.replaceWith('a hoy hoy').text())

// nlp.world().model.one.prefixes.semi = true
// nlp('semi-detatched').debug()

// let world = nlp.world()
// world.model.one.prePunctuation.push('~')
// console.log(nlp.world().model.one.prePunctuation)
// console.log(nlp('~sorta').docs)
// nlp('~sorta').match('sorta').debug()



arr = [

  // `If you notice swelling`,
  // `and whisk to fully incorporate`,
  // `Going shopping alone`,
  // `when the killer strikes`,
  // `Your refusal may cause hurt and disappointment`,
  // 'Carpenter\'s one year of coaching',
  // `Holly objects to Nia's character`,
  // ' visa & travel assistance',
  // 'Let the dishwasher run for an entire cycle',
  // 'by encouraging carpooling',
  // 'Ohio beaver trapping season starts in late December ',
  // 'We Personally Guarantee Everything We Sell',
  // 'we personally guarantee',
  // // 'unless we win',
  // // 'and we offer',
  // "method for measuring",
  // "responsibility for setting",
  // "Attack and resolve your issues",


]
txt = arr[0]
// let doc = nlp(txt).debug()
// doc.match('#Conjunction #Adjective #Noun').debug()

