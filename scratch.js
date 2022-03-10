/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/speech/src/plugin.js'
// nlp.plugin(plg)

nlp.verbose('tagger')


let txt = ''
let arr = [
  'Characters drink Salty Dogs, whistle Johnny B. Goode an..',//watch' no #Verb -
  'They read Mickey Spillane and talk about Groucho and Ha..',//talk' no #Verb -
  'He said the company\'s core business remains strong...',//remains' no #Verb -
  'They operate ships and banks...',//banks' no #Noun -
  '"President Musharraf promised to help us and cooperate ..',//terrorist' no #Adjective -
  'As the leaders like to boast, the Mujahedeen is a famil..',//like' no #Verb -
  'Okay, it\'s partly about strippers and dope...',//dope' no #Noun -
  'In the short run, only fight and win...',//win' no #Verb -
  'This is a significant strategic change and it applies s..',//terrorist' no #Adjective -
  'Photographs from a computer disc included the controls ..',//Photographs' no #Noun -
  'I was originally inquiring about purchasing a Cross or ..',//impressionist' no #Adjective -
  'Nancy, can you please reconfirm with Mark the price for..',//reconfirm' no #Verb -
  'cool by me!..',//cool' no #Adjective -
  'Thursday works for me...',//works' no #Verb -
  'Term sheet for draft contract, as requested...',//contract' no #Noun -
  'Please check Tenn contract 36647 on the Demand speadshe..',//contract' no #Noun -
  'I intend to provide weekly updates on the status of the..',//updates' no #Noun -
  'Randy, this is the issue I left you the voice mail on...',//mail' no #Noun -
  'Many details remain to be worked out, but we will keep ..',//remain' no #Verb -
  'Place: University of Pennsylvania..',//Place' no #Noun -
  'With the price caps gone, the generators filed paperwor..',//caps' no #Noun -
  'Independent wealth?..',//Independent' no #Adjective -
  'It was the favorite fruit of founder Steve Jobs...',//favorite' no #Adjective -
  'The project was designed to help use the newly written ..',//written' no #Verb -
  'and bridges ???..',//bridges' no #Noun -
  'Visit message boards and post this article as a new mes..',//Visit' no #Verb -
  '100 - Percentage of those decisions that Bush then deci..',//ignore' no #Verb -
  '95 - Percentage of foreign goods that arrive in the Uni..',//arrive' no #Verb -
  '680 - Number of suspected al-Qa\'ida members that the Un..',//admits' no #Verb -
  'Is there any cure for mouse poison?..',//poison' no #Noun -
  'I want to apply for canada skilled immigeration program..',//skilled' no #Verb -
  // 'They both had pools for kids',//pools' no #Noun -
  // 'read these reviews and improved!..',//improved' no #Verb -
  // 'Good place to be',//place' no #Noun -
]


let doc = nlp(arr[arr.length - 1])
doc.debug()




