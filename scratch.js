/* eslint-disable no-console, no-unused-vars */
import nlp from './src/four.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')


let txt = `five days.`
let doc = nlp(txt).compute('root').debug()
console.log(doc.text('root'))