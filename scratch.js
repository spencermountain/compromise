/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/speech/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')
// nlp.verbose('chunker')

// weird remove issue
// let m = nlp('one two three. foo.', { two: 'Infinitive' })
// m = m.splitOn('two').eq(0).tag('Foo')
// m.match('three').remove()
// m.debug()


// nlp('set the SCE to AUX.').match('@isUpperCase').debug()

// let doc = nlp("Now, to take the ferry cost a nickel.").debug()

//get filesize
// const bytes = Buffer.byteLength(txt)
// const bytes = (new TextEncoder().encode(txt)).length
// const size = Math.ceil(bytes / 1024)
// console.log(`${size}kb`)
// let doc = nlp("I'm looking for Amanda Hugginkiss")
// // cache the root form of each word
// doc.compute('root')
// // use a 'root' lookup:
// let m = doc.match('{look}')
// m.debug()
