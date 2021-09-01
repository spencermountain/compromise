/* eslint-disable no-console, no-unused-vars */
// import './tests/_ignore/_error.js'
import nlp from './src/three.js'
// nlp.verbose('tagger')

// offset bug
// let doc = nlp(`"hello world`).compute('offset')
// let obj = doc.json({ offset: true, terms: true })[0]
// console.log(obj)

// let doc = nlp('he had barely begun to walk')
// let doc = nlp('it was stolen').debug()
// let doc = nlp('we will sing along').debug()
// let doc = nlp('had been left').debug()
// let doc = nlp('I will be travelling').debug()
// let doc = nlp('he had locked up quickly')
let doc = nlp('is really really walking')

let vb = doc.verbs().debug()
console.log(vb.json()[0].verb)

// let b = nlp('sneaks').tag('Cool')
// let doc = nlp(`john walks quickly`)
// doc.match('walks').replaceWith(b)
// doc.debug()

/*
1. efrt-unpack
2. suffix-thumb
3. grad-school
*/
