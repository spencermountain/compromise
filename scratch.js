/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

nlp.verbose('tagger')
// nlp.verbose('chunker')

let txt = ''
txt = 'quadrillion'

nlp(txt).debug()

// let doc = nlp('before match after. second sentence here.')

// nlp('it is green and he is friendly.').sentences().toFutureTense().debug()

// weird remove issue
// let doc = nlp('two three.')
// let arr = doc.splitOn('two')
// arr.match('three').remove()
// console.log(arr)
// arr.debug()



// isSingular bug
// nlp(`i saw the game that the Toronto Maple Leafs won`).verbs().isSingular().debug()



// const doc = nlp("from Houston AZ and De Armanville, TX FTL", lexicon);
// const doc = nlp("Toronto, Ontario");
// doc.places().debug()


// nlp(`She's got me`).terms().debug() //one


// let doc = nlp(`won't`)
// doc.match(`won't match`).debug()//found
// doc.match(`will`).debug()//found
// doc.match(`(won't|will|shall) match`).debug()//found



// let doc = nlp(`my finger looked green afterwards`)
// doc.nouns().debug().toPlural()


