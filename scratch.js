// const nlp = require('./src/index')
import nlp, { model } from './src/index.js'

// nlp.verbose(true)
let doc = nlp(`they will`)
doc.match('(they && foo) will').debug()
// doc.debug()
// console.log(doc.json())
// console.log(model.tags.Modal)

/*
['swore', '#PastTense'],
['tore', '#PastTense'],
['gore', '#Noun'],
['', '#'],
['', '#'],
['', '#'],
*/
