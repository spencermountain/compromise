/* eslint-disable no-console, no-unused-vars */
import nlp from './src/four.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')

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
  "hussy",
  "oreal",
  "sic",
  "granny",
  "clinic",
  "mic",
  "marsupial",
  "foregoing",
  "allergic",
  "listed",
  "gypsy",
  "mischief",
  'jet',
  "pls",
  "sittin",
  "lil",
  "jus",
  "chop",
  "outta",
  "ridin",
  "ahh",
  "quo",
  "hen",
  "ads",
  "triple",
  "playin",
  "foremost",
  "friends",
  "tha",
  "gag",
  "aladdin",
  "southwest",
  "mah",
  "indie",
  "waitin",
  "guys",
  "cos",
  "leh",
  "fewer",
  "pursuant",
  "gettin",
  "wat",
  "comin",
  "awhile",
  "til",
  "darling",
  "underneath",
  "omg",
  "coz",
  "marine",
  "livin",
  "sayin",
  "nowadays",
  "thee",
  "atchison",
  "nude",
  "tone",
  "shore",
  "combat",
  "halter",
  "stops",
  "lights",
  "wad",
  "unabate",
  "unfound",
  "sub",
  "belate",
  "tin",
  "slope",
  "jazz",
  "vet",
  "unnotice",
  "suite",
  "peyote",
  "uninterest",
  "untest",
  "ink",
  "unhear",
  "unparallel",
  "uninterrupt",
  "saw",
  "mould",
  "presidentelect",
  "unchallenge",
  "torn",
  "cane",
  "overwork",
  "unmatch",
  "unreserve",
  "rebut",
  "unfinish",
  "destitute",
  "disinterest",
  "unsettle",
  "overtime",
  "uninvite",
  "unexplain",
  "uncircumcise",
  "thread",
  "uprise",
  "granite",
  "repute",
  "unsolve",
  "preposition",
  "obligate",
  "overuse",
  "unguard",
  "pend",
  "stake",
  "burnt",
  "distress",
  "sworn",
  "amus",
  "nite",
  "unoppose",
  "fragment",
  "doin",
  "flown",
  "withdrawn",
  "hands",
  "prop",
  "sect",
  "outstand",
  "sunk",
  "statute",
  "daunt",
  "undispute",
  "mediate",
  "cowrote",
  "redefin",
  "uncoordinate",
  unrequit
  "latch",
  "untouch",
  "undertone",
  "intern",
  "hammer",
  "unrelate",
  "tattooed",

  "puzzled",

  "texted",

  "recycled",

  "chronicled",

  "torpedoed",

  "clasped",

  "vetoed",

  "gasped",

  "crawled",

  "growled",

  "deathbed",

  "washed",

  "indebted",

  "naval",
  "rid",

  "lovin",
  "aka",
  'tunnel',
  'probe',
  'bargain',
  'manufacturing',
  'stream',
  'anger',
  'cave',
  'spite',
  'tribute',
  'reserve',
  'intent',
  'mandate',
  'expert',
  'resident',
  "putty",
  "resident",
  "pro",
  "hooky",
  'what companies are doing is',
  'stick'
]
// let doc = nlp(arr[0]).debug()
// console.log(doc.compute('root').text('root'))

// console.log(doc.json({ root: true })[0])

let doc = nlp("Jeff's bikes")
doc.swap('Jeff', 'John')
console.log(doc.text())
console.log(doc.json()[0])

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