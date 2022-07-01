/* eslint-disable no-console, no-unused-vars */
import nlp from './src/two.js'
// import plg from './plugins/speed/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')

let txt = ''
let doc
// doc = nlp('33 kilos').debug()
// doc = doc.match('33 km').debug()

// doc = nlp('he sweetly sang').debug()
// doc.match('{sweet}').debug()
// console.log(nlp.parseMatch('{sweet/adj}'))


// doc = nlp.lazy('one two three. four five six. seven foo eight nine.', 'foo #Value')
// doc.debug()



// "Okay, okay, okay should I be scared?"
// "This is when I started to get scared."

// "A 40-year-old man called me swell."
// "that's just not swell"

txt = "Let’s get you into wardrobe for a fitting."
// txt = "I was an expert"
// txt = "definitely worth a rental."
// txt = "keeping the matter a secret"

// txt = "My pants don't even fit right"
// txt = "In a baseball hat fit for a queen"
// txt = "Srinath will be fit in three weeks"
// txt = "does the different part fit together"

// txt = "License fee for beach vendors hiked"
// txt = "TTC to hike fares by 10 cents in March"

// txt = "He deserted from the Dragoons at"
// txt = "banks wear deserted look"

// txt = "CBI catches DD acting director taking bribe"
// txt = "How do I keep kissing you, and catch my breath?"

// txt = " throw stones, Dick, said Jaqueline."
// txt = "Loblaws reducing food prices at Toronto stores"
// txt = "Stock prices closed higher in Stockholm"

// txt = `Upload documents required to verify your eligibility`

txt = `It sure seemed that way.`
txt = `I am not sure when to take.`
txt = `Pretty sure my arm is broke`
txt = `Not sure about the details.`
txt = `Sure you don't wanna pretzel?`
txt = `You, you sure you need shoes?`
txt = `Sure enough, no one was there.`
txt = `Are you sure you wanna do this?`
txt = `make sure that it's truly lost.`
txt = `You sure this is what you want?`


txt = `she'll come around`
txt = ` felt a bit confused`


nlp(txt).debug()