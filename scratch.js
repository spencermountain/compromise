/* eslint-disable no-console, no-unused-vars */
// const nlp = require('./src/index')
import nlp, { model } from './src/index.js'
// import nlp from './src/tokenize.js'

// nlp.verbose(true)

// let doc = nlp.tokenize('five one one nine')
// doc.match('one{2,6}').debug()

let r = nlp('spencer is here. hoo ha. spencer two')
r.match('.').debug()

// console.log(nlp.parseMatch('john #FirstName{3,6}'))

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
