/* eslint-disable no-console, no-unused-vars */
import nlp from './src/one.js'
// import plg from './plugins/speech/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')
// nlp.verbose('chunker')

// weird remove issue
// let m = nlp('one two three. foo.', { two: 'Infinitive' })
// m = m.splitOn('two').eq(0).tag('Foo')
// m.match('three').remove()
// m.debug()

// let doc = nlp('He will learn to really like this')
// doc.chunks().debug('chunks')
// doc.nouns().debug('chunks')

import wtf from '/Users/spencer/mountain/wtf_wikipedia/builds/wtf_wikipedia.mjs'

wtf.fetch('Sea breeze').then(doc => {
  let txt = doc.text()
  let begin = new Date()
  nlp(txt)
  // 
  let end = new Date()
  console.log((end.getTime() - begin.getTime()))

})

// let doc = nlp("looked for Amanda Hugginkiss")
// // cache the root form of each word
// doc.compute('cache')
// // use a 'soft' lookup:
// let m = doc.match('{look}')
// // print our result:
// m.debug()