/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')


// let doc = nlp('one match two three')
// let a = doc.match('match two')
// let b = a.remove('two')
// console.log(a)
// // a.debug()
// // b.debug()
// console.log(b)

let doc = nlp(`john is really walking`)
doc.debug()
console.log(doc.verbs().json())


// conjugation issues
// txt = 'go'
// txt = 'fulfil'
// txt = 'outgrow'
// txt = 'prod'
// txt = 'shine'
// txt = 'shun'
// txt = 'slam'
// txt = 'take part'
// txt = 'unearth'
// txt = 'collide'
// let doc = nlp(txt)
// doc.debug()
// console.log(doc.verbs().conjugate()[0])

// bug: incompatible tags
// nlp('Cliff Climber Group').debug()
// nlp('June Holiday Sweeps').debug()

// let matches = [
//   {
//     match: '/foo/',
//     tag: 'Reg',
//     reason: '01/01/2020',
//   },
// ]
// let net = nlp.buildNet(matches)
// let m = nlp('first. foo bar').sweep(net).view
// m.debug()
// console.log('----')
// console.dir(net, { depth: 5 })
// let doc = nlp('asdf 2nd bar')
// doc.match('/[0-9]{1,2}(st|nd|rd|th)/').debug()

// let m = doc.sweep(net).view
// m.debug()

// let doc = nlp('before match after. second sentence here.')

// nlp('it is green and he is friendly.').sentences().toFutureTense().debug()

// isSingular bug
// nlp(`i saw the game that the Toronto Maple Leafs won`).verbs().isSingular().debug()


// const doc = nlp("from Houston AZ and De Armanville, TX FTL", lexicon);
// const doc = nlp("Toronto, Ontario");
// doc.places().debug()


// nlp(`She's got me`).terms().debug() //one


// let doc = nlp(`won't match`)
// doc.match(`(won't|will|shall) match`).debug()//found



