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

let doc = nlp("$4.09CAD")
console.log(doc.money().json())
/*[{
    text: 'four out of five',
    terms: [ [Object], [Object], [Object], [Object] ],
    fraction: { numerator: 4, denominator: 5, decimal: 0.8 }
  }
]*/


// let doc = nlp("Wayne's World, party time")
// let str = doc.people().normalize('heavy').text()
// console.log(str)
// "wayne"
// console.log(doc.text())