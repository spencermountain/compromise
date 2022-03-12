/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/speech/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')

let txt = ''
txt = 'suddenly bolt heatedly'
let doc = nlp(txt).compute('root')
let json = doc.adverbs().json()[0]
console.log(json)
// doc.adverbs().toAdjective().debug()