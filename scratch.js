/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/paragraphs/src/plugin.js'
// nlp.plugin(plg)
let txt = ''
// let doc
// let m

nlp.verbose('tagger')


// let doc = nlp('When Dona Valeria finds out that Fernando Jose is in a relationship, she gets mad at her son for dating someone beneath their social status')
// doc.compute('coreference')



// // bug 3
// let doc = nlp("Dr. John Smith-McDonald...?  ")
// let opts = {
//   keepPunct: false,
//   keepSpace: false,
//   case: false,
// }
// console.log(doc.text(opts) + '|')


// console.log(nlp('two turtledoves and a partridge in a pear tree').nouns().isSingular().out('array'))

// let doc = nlp('hello there after words')
// let regs = doc.match('(after|words)+').docs[0].map(t => {
//   return { id: t.id, optional: true }
// })

// let m = doc.match('hello there')
// console.log(doc.replaceWith('a hoy hoy').text())
// console.log(m.json({ sentence: true }))
// m.growRight(regs).debug()

// let doc = nlp('hello there')
// console.log(doc.replaceWith('a hoy hoy').text())

// nlp.world().model.one.prefixes.semi = true
// nlp('semi-detatched').debug()

// let world = nlp.world()
// world.model.one.prePunctuation.push('~')
// console.log(nlp.world().model.one.prePunctuation)
// console.log(nlp('~sorta').docs)
// nlp('~sorta').match('sorta').debug()



let arr = [


  // 'Caring for Kaneohe since 1986',
  // 'Boost user engagement',
  // 'Work to improve lives',
  // 'A swaging machine works by using two or four',
  // 'NMDAR signaling increases RanBP1 expression',
  // 'Notes on eastern American poetry',
  // 'call ahead and reserve one',
  // 'in the room where you usually nurse',
  'We Sell All Brands',
  'Hillary Rodham Clinton',
  'place tea bags in hot water',
  // 'while the therapist watches',
  // 'All right relax'
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
let doc = nlp(txt).debug()
// doc.match('#Conjunction #Adjective #Noun').debug()

