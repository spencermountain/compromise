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

  // 'jet',

  // "sittin",
  // "ridin",
  // "jus",
  // "foregoing",
  // "allergic",
  // "listed",

  // "quo",
  // "triple",
  // "playin",
  // "foremost",
  // "friends",
  // "waitin",
  // "guys",
  // "gettin",
  // "comin",
  // "livin",
  // "sayin",
  // "tone",
  // "shore",
  // "combat",
  // "wad",
  // "sub",
  // "slope",


  // "ink",

  // "unheard",
  // "unparalleled",
  // "uninterrupted",
  // "uninterested",
  // "untested",
  // "unnoticed",
  // "unchallenged",
  // "unreserved",
  // "unsettled",
  // "uninvited",
  // "unexplained",
  // "uncircumcised",
  // "unrequited",
  // "unmatched",
  // "unfinished",


  // "overworked",
  // "disinterested",
  // "untouched",
  // "uprise",
  // "unopposed",
  // "undisputed",
  // "unguarded",
  // "unrelated",

  // "reputed",
  // "overused",
  // "pending",
  // "distress",
  // "would be amusing",
  // "fragment",
  // "doin",
  // "withdrawn",
  // "hands",
  // "would be outstanding",
  // "redefined",
  // "thread",

  // "hammer",
  // "tattooed",
  // "puzzled",
  // "recycled",
  // "lovin",
  // "rid",

  // 'probe',
  // 'bargain',
  // 'manufacturing',
  // 'stream',
  // 'cave',
  'what companies are doing is',
]
let doc = nlp(arr[0]).debug()
console.log(doc.compute('root').text('root'))

// console.log(doc.json({ root: true })[0])

// let doc = nlp("Jeff's bikes")
// doc.swap('Jeff', 'John')
// console.log(doc.text())
// console.log(doc.json()[0])

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