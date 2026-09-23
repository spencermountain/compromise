
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)
// nlp.verbose(true)

let doc = nlp('she bit her tongue')
doc.debug()
doc.sentences().toPastTense()
doc.debug()
