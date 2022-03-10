/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/speech/src/plugin.js'
// nlp.plugin(plg)

nlp.verbose('tagger')

let txt = ''
let arr = [
  // 'Photographs from a computer disc included the controls ..', //'Photographs' no #Noun -
  // 'Visit message boards and post this article as a new mes..', //'Visit' no #Verb -
  // 'Provided me with warm blanket and has soft music playing', //'playing' no #Gerund -
  'she needs to develop ',
  // 'from their hands',
]


let doc = nlp(arr[arr.length - 1])
doc.debug()




