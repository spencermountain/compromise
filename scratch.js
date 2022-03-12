/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/speech/src/plugin.js'
// nlp.plugin(plg)

nlp.verbose('tagger')

let txt = ''
txt = 'a sudden bolt'
txt = `frank's (open) 'bar'.`
txt = `Union Corp`
let doc = nlp(txt)
// let m = doc.match('angeles')
// m = m.growLeft('los')
doc.debug()