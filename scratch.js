/* eslint-disable no-console, no-unused-vars */
import nlp from './src/two.js'
// import plg from './plugins/speech/src/plugin.js'
// nlp.plugin(plg)
// import nlp from './builds/three/compromise-three.cjs'
// nlp.verbose('tagger')



let txt = ''

// jan 11
// txt = `SQL code by IBM.`
// txt = `auto mechanics that work for`
// txt = `Good place to be`
// txt = `energy and finance `
// txt = `leaders and delegates abandoned Gandhi`
// txt = `are some of the brands you [can find]`

txt = `They both had pools`
txt = `cramped his style`
txt = `darwin said`
txt = `victoria learned`
txt = `He split 2 1980 title fights with Roberto Duran`
txt = `continue as state chief`
txt = `there were the walks`
txt = `Favorite place in Tampa`


txt = `Gandhi's cool`
txt = `i'd really walked`
txt = `what'd he go`
txt = `He'd gone`
// txt = `the voice mail on.`


txt = "mr. clinton"
let doc = nlp(txt)
console.log(doc.text('normal'))

