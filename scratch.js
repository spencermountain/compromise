/* eslint-disable no-console, no-unused-vars */
import nlp from './src/four.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

nlp.verbose('tagger')

let arr = [
  "Louis VI of France was known as this; as a child he must have shopped in le husky department",
  "Oh my god he sounded just like my high school wrestling  coach.",
  "New restaurant organizes their menu by feelings",
  "a state implemented voting to increase their total",
  "give our people the tools they need",
  'I have also heard rumors that drivers save on gas when they idle',
  'when I looked at my girlfriend her head would grow and shrink',
  'before any of the ladies of the Court could stop him he spoke',
  `was very well pleased with the magician's conduct, and said to her`,
  'Men are of different heights, yet they range about a mode',
  'the committee gathered their delegates',
  'the leverage of Brussels over new member states increases after they join'
]
let doc = nlp(arr[0])//.debug()


// doc.nouns().debug()
console.log('from:')
let pron = doc.pronouns().debug()

console.log('to:')
pron.refersTo().debug()


// .nouns() issues
arr = [
  "They were like three very beautiful young women",
  'According to Sean Scalmer, Gandhi in his final year of life was an ascetic',
  `besides the larger chains, Fairley's adds considerable value`,
  'Some citizens in this Canadian capital',
  'the last Russian Tzar (Nicholas II), and his failure',
  `Former U.S. Representative Joe Schwarz, a Republican, said in April 2009`,
  `1 of these carried a Kansas woman 60 ft., dropping her `,
  `we all know the proximate causes of an economic crisis: people are not spending`,
  `if you are in a supermarket, you might comment about how tasty something looks and ask if they have tried it.`
]
doc = nlp(arr[0])
doc.nouns().debug()


