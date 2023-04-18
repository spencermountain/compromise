/* eslint-disable no-console, no-unused-vars */
import nlp from './src/four.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

nlp.verbose('tagger')


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
  */

let arr = [
  'what companies are doing is'
]
let doc = nlp(arr[0]).debug()
// console.log(doc.json({ root: true })[0])