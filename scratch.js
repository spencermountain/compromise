/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
import dates from './src/3-three/_dates/plugin.js'
nlp.plugin(dates)
// import nlp from './builds/compromise.cjs'
// nlp.verbose('tagger')

let txt = ''

// let doc = nlp(txt)
// doc.debug()

// const doc = nlp('he is cool')
// doc.verbs().toNegative()
// doc.debug()


const doc = nlp('on september 12 1998 yeah')
// doc.dates().debug()
console.log(doc.dates().json())

// let doc = nlp(txt)
// doc.debug()




/*










*/
