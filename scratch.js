/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/speech/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')

let txt = ''
txt = 'suddenly and heatedly'
let doc = nlp(txt).compute('root')
doc.swap('heated', 'warm')
doc.swap('sudden', 'immediate')
doc.debug()