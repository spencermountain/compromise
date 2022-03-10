/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/speech/src/plugin.js'
// nlp.plugin(plg)

nlp.verbose('tagger')


let txt = ''
txt = `another fool to roast`
txt = `restrike`

let doc = nlp(txt)
doc.debug()




