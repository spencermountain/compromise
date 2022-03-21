/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/speech/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')
// nlp.verbose('chunker')

let txt = ''
// let doc = nlp(txt)
// doc.debug()

// weird remove issue
// let m = nlp('one two three. foo.')
// m = m.splitOn('two')
// m.match('three').remove()
// m.debug()

txt = [['one', 'two', 'three'], ['four']]
let a = nlp(txt)

a.debug()