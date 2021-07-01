// const nlp = require('./src/index')
import nlp, { model } from './src/index.js'

// nlp.verbose(true)
let doc = nlp(`wash fun. write off`)
// console.log(doc.json())
// doc.match('#Noun van [<name>.]').debug()
// doc.cache()

doc.debug()

// swear

/*
['', ''],
['', ''],
['', ''],
['', ''],
*/
