/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

nlp.verbose('tagger')

// let doc = nlp('one match two three')
// let a = doc.match('match two')
// let b = a.remove('two')
// console.log(a)
// // a.debug()
// // b.debug()
// console.log(b)



// let matches = [
//   { match: 'third' },
// ]
// let net = nlp.buildNet(matches)
// let doc = nlp(`first. second. third`)
// doc = doc.reverse()
// let res = doc.sweep(net)
// res.found[0].view.soften()
// res.found[0].view.debug()
// console.log(res.found[0].view)

// let doc = nlp(`first. second. third`)
// doc = doc.reverse()
// let m = doc.match('third')
// m.soften()
// console.log(m)
// m.debug()



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



// nlp('it is green and he is friendly.').sentences().toFutureTense().debug()

// isSingular bug
// nlp(`i saw the game that the Toronto Maple Leafs won`).verbs().isSingular().debug()


// const doc = nlp("from Houston AZ and De Armanville, TX FTL", lexicon);
const doc = nlp('I flew to Austin, Texas');
doc.places().debug()



