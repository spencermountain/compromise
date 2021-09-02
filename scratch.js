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

let doc = nlp('it had clearly been acknowledged') //.debug()
// let doc = nlp('we will not work out') //.debug()
doc.compute('chunks').debug('chunks')

let vb = doc.verbs().debug()
// console.log(vb.json()[0].verb)

// console.log(vb.parse()[0].adverbs.post.text())

// console.log(vb.json()[0].verb)

// let b = nlp('sneaks').tag('Cool')
// let doc = nlp(`john walks quickly`)
// doc.match('walks').replaceWith(b)
// doc.debug()

/*
1. efrt-unpack
2. suffix-thumb
3. grad-school
*/
