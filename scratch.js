/* eslint-disable no-console, no-unused-vars */
// const nlp = require('./src/index')
import nlp, { model } from './src/index.js'
// import nlp from './src/tokenize.js'
process.env.DEBUG_TAGS = true

nlp.verbose(true)

// nlp.verbose(true)
let doc = nlp(`Morocco Standard Time`)
// doc.match('(they && foo)').debug()
// doc.debug()

// console.log(doc.json())
// console.log(model.lexicon['morocco standard time'])

/*
['swore', '#PastTense'],
['tore', '#PastTense'],
['gore', '#Noun'],
['', '#'],
['', '#'],
['', '#'],
*/
