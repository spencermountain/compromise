/* eslint-disable no-console, no-unused-vars */
import nlp from './src/one.js'
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




// const doc = nlp("foo. found one after found bad")
// let net = nlp.buildNet([{ match: 'found .', ifNo: ['bad'] }])
// doc.match(net).debug()




// let doc = nlp('the remaining claims fail').debug()
let doc = nlp('The service is fast psych')
let net = nlp.buildNet([{ match: 'is fast .', notIf: 'psych' }])
doc.match(net).debug()

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
txt = arr[0]
// let doc = nlp(txt).debug()
// doc.match('#Conjunction #Adjective #Noun').debug()

