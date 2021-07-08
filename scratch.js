/* eslint-disable no-console, no-unused-vars */
// import './tests/lib/_error.js'
import nlp from './src/index.js'
// import nlp from './src/one/index.js'

// nlp.verbose(true)

// let doc = nlp('the big dog played')
// doc.match('the [<target>#Adjective] [<type>#Noun] [<target>played]', 'target').debug()

let doc = nlp('the dog played')
// doc.match([{ word: 'dog', group: 0 }], 0).debug()
doc.match('[dog]', 0).debug()
console.log(nlp.parseMatch('[dog]'))
/*

['', '#'],
['', '#'],
['', '#'],
*/
