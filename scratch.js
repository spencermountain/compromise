/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/speech/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')
// nlp.verbose('chunker')

// weird remove issue
let m = nlp('one two three. foo.')
m = m.splitOn('two')
m.match('three').remove()
m.debug()
