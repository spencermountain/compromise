/* eslint-disable no-console, no-unused-vars */
import nlp from './src/four.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')


/*
verbs
"sure",
"worth",
"entitled",
  "better",
  "ain't",
  "programme",
  "gotten",
"shot",
  "say.",  
  "undertaken",
  "begun",
    "all",
  "total",
"hidden",
  "firm",
  "stuck",
  "eaten",
  "legend",
  "spoken",
  "drew",
  "calm",
  "stolen",
  "seate",
  "women",
  "cloth",
  "worn",
  "institute",
  "pend",
  "intrigue",
  "mistaken",
  "burnt",
  "starts",
  "privilege",
  "tattooed",
  "headquarter",
  "tonite",
  "paradise",
  "lime",
  "band",
  "someday",
  "station",
  "hood",
  "trash",
  "uneven",
  "ridden",
  "undispute",
  "multifacet",
  "unabate",
  "lightheart",
  "peacemak",
  "backstop",
  "rever",
  "ultimately",
  "belate",
    "panick",
"floode",
  "bestsell",
  "magnate",
  "hormone",
  "sible",
  "suite",
  "outspoken",
  "daresay",
  "beguil",
  "fundrais",
  "dizzy",
  "naughty",
  "breathtake",
  
  "forthcome",
  "impal",
  "infinite",
  "matchmak",
  "hardship",
  
  
  */

/*
  adj
  "about",

  "unfortunately",
    "keeping",
  "wanting",
    "nevertheless",
  "solar",

  "lately",
    "principal",
  "medal",
  "majesty",
  "feeling",
"commentary",
  "saying",
  "speaking",
  "focal",
    "fortunately",
  "fashioned",
  "parking",
"was",
  "utter",
    "recipient",
  "excess",
  "mentioned",
  "hobby",
  "heist",
  "signatory",
  "bowling",
  "lunatic",
  "narcotic",
  "pollen",
"sentencing",
  "fugitive",
  "arent",
  "dwelling",
  "arctic",
  "threesome",
  "biopic",
  "sabbatical",
  "oatmeal",
  "arsenal",
  "arsenic",
  "desist",
  "seinfeld",
  "nutrient",
  "missive",
  
  */
/*
  nouns

 
  
  
  
  
  
  
  */

let arr = [
  'please do not speak',
  'is a tough read',
  // "spot on",
  // "up to date",
  "sleepier",
  "guiltier",
  "hairier",
  "richest",
  "hardcore",
  "grim",
  "rainy",
  "homeless",
  "nerdy",
  "parents",
  'what companies are doing is'
]
let doc = nlp(arr[0]).debug()
console.log(doc.compute('root').text('root'))
// console.log(doc.json({ root: true })[0])

// import adj from './data/lexicon/adjectives/adjectives.js'

// adj.forEach(str => {
//   let obj = nlp(str).adjectives().conjugate()[0]
//   if (!obj || !obj.Comparative) {
//     // console.log(str, obj)
//     return
//   }
//   if (!nlp(obj.Comparative).has('#Comparative')) {
//     console.log([str, obj.Comparative])
//   }
// })