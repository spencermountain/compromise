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


let doc = nlp('one here. two here. three here')
// let mid = doc.match('two here')
// mid = mid.concat('cool times. oh yeah')
doc.concat('cool times. oh yeah')
doc.debug()
// mid.all().debug()

let arr = [


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


// txt = a[0]
// let doc = nlp(txt)
// doc.debug()

