/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')

let txt = ''
let doc
let m


// doc = nlp(`the doc said "no sir" and walked away. the end`)
txt = `
You'll be able to create opportunities for advancement almost out of thin air.
sentence match four.
Romance in 2005 will make it a year to remember - and you'll be the envy of all your friends.
Your working life might not go so smoothly this year, Virgo.
`
doc = nlp(txt)

doc.debug()
// let json = doc.json()
// t.equal(json[4].text, 'sentence number four.', 'got sentence')
// console.log(json[3])