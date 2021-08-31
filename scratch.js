/* eslint-disable no-console, no-unused-vars */
// import './tests/_ignore/_error.js'
import nlp from './src/three.js'
nlp.verbose('tagger')

// offset bug
// let doc = nlp(`"hello world`).compute('offset')
// let obj = doc.json({ offset: true, terms: true })[0]
// console.log(obj)

// let doc = nlp('he had barely begun to walk')
// let doc = nlp('it was stolen').debug()
// let doc = nlp('we will sing along').debug()
// let doc = nlp('had been left').debug()
// let doc = nlp('I will be travelling').debug()
let doc = nlp('he will walk').debug()
let vb = doc.verbs()
console.log(vb.json()[0].verb)

/*
1. efrt-unpack
2. suffix-thumb
3. grad-school
*/
