/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/speech/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')

let txt = ''
let arr = [
  // 'Photographs from a computer disc included the controls ..', //'Photographs' no #Noun -
  // 'Visit message boards and post this article as a new mes..', //'Visit' no #Verb -
  // 'Provided me with warm blanket and has soft music playing', //'playing' no #Gerund -
  'he is redefining art',
  'he is redefining his art',
  'i wish that',
  // 'fish hooks',

]
// txt = `people started to look`
txt = `people will start looking`


let doc = nlp(txt)

doc.verbs().debug().toPresent()
doc.debug()


