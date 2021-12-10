/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/speech/src/plugin.js'
// nlp.plugin(plg)
// import nlp from './builds/three/compromise-three.cjs'
// nlp.verbose('tagger')

let txt = ''

// let doc = nlp(txt)
// doc.debug()

// const doc = nlp('he is cool')
// doc.verbs().toNegative()000
// doc.debug()

txt = `he clearly did not suggest`
txt = `they're good`
txt = `people will seldom start looking`
txt = `we had walked`
txt = `we've gone`
txt = `we've walked `

let doc = nlp(txt)
doc.verbs().parse()
console.log(doc.text())
// console.log(doc.json({ syllables: true })[0])
// doc.verbs().toPresent()
// doc.verbs().toNegative()
// doc.debug()
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
