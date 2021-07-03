/* eslint-disable no-console, no-unused-vars */
// const nlp = require('./src/index')
import nlp, { model } from './src/index.js'
// import nlp from './src/tokenize.js'

nlp.verbose(true)
// let doc = nlp(`Howard Stern`)
// let doc = nlp(`Cameron Diaz`)
let doc = nlp(`Cameron, too`)
doc.match('@hasComma').debug()
// doc.debug()

// console.log(nlp.parseMatch('@hasComma'))

// console.log(doc.json())
// console.log(model.lexicon['healing over'])
// console.log(model.tags.Person)
// console.log(model._multiCache.has('healing'))

/*
['swore', '#PastTense'],
['tore', '#PastTense'],
['gore', '#Noun'],
['', '#'],
['', '#'],
['', '#'],
*/
