/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
import plg from './plugins/dates/src/plugin.js'
nlp.plugin(plg)

nlp.verbose('tagger')

// let doc = nlp('one match two three')
// let a = doc.match('match two')
// let b = a.remove('two')
// console.log(a)
// // a.debug()
// // b.debug()
// console.log(b)



// let matches = [
//   { match: 'remove .' },
//   { match: 'hello' },
// ]
// let net = nlp.buildNet(matches)
// let doc = nlp(`before here. hello remove this. after here`)
// doc = doc.not('remove this')
// doc.match(net).debug()

let txt = `unnecessary.`
let doc = nlp(txt).debug()
// console.log(nlp.model().two.matches.length)
// let doc = nlp('he will walk')
// let vb=doc.match('will walk')

// doc.verbs().toPresentTense()
// doc.debug()

// let txt = `
// zero foo
// one match foo
// two foo
// `
// let doc = nlp(txt)

// doc.harden()
// let m = doc.eq(1)
// m.remove()
// console.log('\n\n=-=-remove=-=-')
// console.log(doc)
// doc.debug()



// json = doc.eq(3).json()[0]
// let matches = [
//   { match: 'cliff climber', tag: 'Organization' },
//   { match: 'hello' },
// ]
// let net = nlp.buildNet(matches)
// doc.sweep(net)
// doc.debug()

// conjugation issues
// let txt = ''
// txt = 'i will go on a boat'
// txt = `why is the doc`
// txt = 'take part'
// txt = 'fulfil'
// txt = 'outgrow'
// txt = 'prod'
// txt = 'shun'
// txt = 'slam'
// txt = 'collide'
// let doc = nlp(txt)
// doc.debug()
// console.log(doc.verbs().conjugate()[0])

// nlp('More seats').debug()

// let doc = nlp('Whatever Will B. Will Bee')
// doc.debug()
// let doc = nlp('before match after')
// let m = doc.match('match')
// m.fullSentence()
// m.debug()


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



