/* eslint-disable no-console, no-unused-vars */
import nlp from './src/two.js'
// import plg from './plugins/speech/src/plugin.js'
// nlp.plugin(plg)

nlp.verbose('tagger')

let txt = ''
let doc = nlp('a sudden bolt').compute('root')
// console.log(doc.json()[0].terms)
// doc.swap('koala', 'giraffe')
doc.debug()
