/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/speech/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')

let txt = ''
txt = `please tell me you'll address the issue`
txt = `We are introducing ourselves to the class.`
let doc = nlp(txt)
doc.debug()
console.log(doc.sentences().json())