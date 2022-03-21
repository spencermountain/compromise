/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/speech/src/plugin.js'
// nlp.plugin(plg)

nlp.verbose('tagger')
// nlp.verbose('chunker')

// weird remove issue
// let m = nlp('one two three. foo.')
// m = m.splitOn('two')
// m.match('three').remove()
// m.debug()

nlp.plugin({ words: { farming: 'Foo' } })
nlp('i was farming').debug()
console.log(nlp.methods())

// let b = nlp.fork()
// b.plugin({ words: { farming: 'Foo' } })
// console.log(b.model().one.lexicon.farming)
// b('i was farming').debug()
