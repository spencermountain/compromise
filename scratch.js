/* eslint-disable no-console, no-unused-vars */
import nlp from './src/four.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

nlp.verbose('tagger')



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