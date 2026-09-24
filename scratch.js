
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

nlp.verbose(true)
nlp('Their daughter drew a rainbow.').debug()
