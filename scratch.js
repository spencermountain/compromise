/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/speech/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')
// nlp.verbose('chunker')


let doc = nlp("soft and yielding like a nerf ball")
let out = doc.out({
  '#Adjective': (m) => `[${m.text()}]`
})


// nlp('eleven hundred').numbers().add(1).debug()
// nlp('7,938').numbers().add(1).debug()
// nlp('938.4cm').numbers().add(1).debug()

// nlp('33rd').numbers().minus(1).debug()

let str = '2 million'
let m = nlp(str)
// m.values().toNumber()
m.values().add(3)
m.debug()

// weird remove issue
// let m = nlp('one two three. foo.', { two: 'Infinitive' })
// m = m.splitOn('two').eq(0).tag('Foo')
// m.match('three').remove()
// m.debug()
