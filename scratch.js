/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/speech/src/plugin.js'
// nlp.plugin(plg)

nlp.verbose('tagger')

let txt = ''
let arr = [
  'Characters drink Salty Dogs, whistle Johnny B. Goode an..', //'reruns' no #Noun -
  'They operate ships and banks...', //'and' no #Conjunction -
  'The revolt took two weeks to be suppressed by the Repub..', //'Republican' no #Noun -
  '"President Musharraf promised to help us and cooperate ..', //'terrorist' no #Adjective -
  'Photographs from a computer disc included the controls ..', //'Photographs' no #Noun -
  'It has been a pleasure to meet with you and I hope we c..', //'finance' no #Noun -
  'With the price caps gone, the generators filed paperwor..', //'caps' no #Noun -
  'the newly written SQL code by IBM.', //'code' no #Noun -
  'Visit message boards and post this article as a new mes..', //'Visit' no #Verb -
  'But there are just so many poses and programs!..', //'and' no #Conjunction -
  'They must have read these reviews and improved!..', //'improved' no #Verb -
  // 'Provided me with warm blanket and has soft music playing', //'playing' no #Gerund -

]


let doc = nlp(arr[arr.length - 1])
doc.debug()




