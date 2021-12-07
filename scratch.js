/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import dates from './plugins/dates/src/plugin.js'
// nlp.plugin(dates)
// import nlp from './builds/compromise.cjs'
nlp.verbose('tagger')

let txt = ''

// let doc = nlp(txt)
// doc.debug()

// const doc = nlp('he is cool')
// doc.verbs().toNegative()000
// doc.debug()

txt = `usually is really walked often`
txt = `people will seldom start looking`
txt = `he clearly did not suggest`
txt = `they're good`
txt = `i'm good`
txt = `we want to walk`

txt = ``



txt = ` read these reviews and improved!`
txt = ` another fool to roast`

let doc = nlp(txt)
// doc.replace('hazed', 'fogged')
// doc.verbs().toPresent()
// doc.verbs().toNegative()
doc.debug()
// console.log(doc.text())

// const doc = nlp('Tony on september 12 1998 yeah')
// const doc = nlp('fifty five')
// doc.numbers().toOrdinal()
// doc.debug()
// console.dir(doc.times().json({ terms: false }), { depth: 5 })
// console.dir(doc.dates().json({ terms: false }), { depth: 5 })
// let doc = nlp(txt)
// doc.debug()




/*










*/
