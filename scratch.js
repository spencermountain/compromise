// const nlp = require('./src/index')
import nlp, { model } from './src/index.js'

// nlp.verbose(true)
let doc = nlp(`writes off`)
// doc.match('#Noun van [<name>.]').debug()
doc.debug()

/*
['swore', '#PastTense'],
['tore', '#PastTense'],
['gore', '#Noun'],
['', '#'],
['', '#'],
['', '#'],
*/
