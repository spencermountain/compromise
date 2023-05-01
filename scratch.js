/* eslint-disable no-console, no-unused-vars */
import nlp from './src/four.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

nlp.verbose('tagger')


/*
verbs

  
  
  */

/*
  adj
  'about',

  'unfortunately',
    'keeping',
  'wanting',
    'nevertheless',
  'solar',

  'lately',
    'principal',
  'medal',
  'majesty',
  'feeling',
'commentary',
  'saying',
  'speaking',
  'focal',
    'fortunately',
  'fashioned',
  'parking',
'was',
  'utter',
    'recipient',
  'excess',
  'mentioned',
  'hobby',
  'heist',
  'signatory',
  'bowling',
  'lunatic',
  'narcotic',
  'pollen',
'sentencing',
  'fugitive',
  'arent',
  'dwelling',
  'arctic',
  'threesome',
  'biopic',
  'sabbatical',
  'oatmeal',
  'arsenal',
  'arsenic',
  'desist',
  'seinfeld',
  'nutrient',
  'missive',
  
  */

let arr = [

  // 'stuck',
  // 'peacemaking',
  // 'revered',
  // 'panicked',
  // 'flooded',
  // 'suited',
  // 'beguiled',
  // 'fundraising',
  // 'impaled',
  // 'matchmaking',

  // 'became seated',

  // 'please do not speak',
  // 'is a tough read',
  // 'spot on',
  // 'up to date',
  // 'sleepier',
  // 'guiltier',
  // 'hairier',
  // 'richest',
  'what companies are doing is',
  'stick'
]
let doc = nlp(arr[0]).debug()
console.log(doc.compute('root').text('root'))
// console.log(doc.json({ root: true })[0])

// import adj from './data/lexicon/adjectives/adjectives.js'

// let adj = ['rich']
// adj.forEach(str => {
//   let obj = nlp(str).adjectives().conjugate()[0]
//   console.log(obj)
//   if (!obj || !obj.Comparative) {
//     // console.log(str, obj)
//     return
//   }
//   if (!nlp(obj.Comparative).has('#Comparative')) {
//     console.log([str, obj.Comparative])
//   }
// })