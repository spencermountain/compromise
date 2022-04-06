/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/speech/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')
// nlp.verbose('chunker')

// nlp('it is green and he is friendly.').sentences().toFutureTense().debug()

// weird remove issue
// let m = nlp('one two three. foo.', { two: 'Infinitive' })
// m = m.splitOn('two').eq(0).tag('Foo')
// m.match('three').remove()
// m.debug()


// let doc = nlp('January the 12th of 2022 at 3pm')
// let tmp = doc.clone()
// tmp.remove('(the|of|at)')
// tmp.numbers().toCardinal()
// // 'january 12 2022'
// let tmpYear = tmp.match('#Month #Value [#Value]', 0)
// // get the match in the original document
// let year = doc.match(tmpYear)
// console.log(tmpYear)
// year.debug()

// let doc = nlp('one two three')
// let tmp = doc.clone()
// // mutate the original
// doc.remove('two')
// // return a partial
// return doc.match(tmp).text()

let txt = ``
txt = `to see what had happened, threw herself head foremost.`
txt = `the remarkable was better`
txt = `more broken promises`
txt = `Address potential causes.`
txt = `to express the subject.`
// txt = `dismiss this`
// txt = `blew Curdken's hat`
// txt = `needed to access.`
txt = `its great purposes`
txt = `great purposes`
txt = `his excuses`
txt = `virus`
txt = `he needed to access`
// txt = `his abuses`
// txt = `He ws quiet`
// txt = `he swims to`
// txt = `others`
// txt = `yours`

// let doc = nlp(txt)
// doc.replace('excuses', 'foo')
// doc.compute('root')
// doc = doc.normalize('heavy')
// doc.debug()


// nlp(`i saw the game that the Toronto Maple Leafs won`).verbs().isSingular().debug()

// doc = nlp(`he walks down the street and smells the flowers.`)
// doc.sentences().toFutureTense()
// doc.debug()

// let doc = nlp(txt).compute('root').debug()
// doc.verbs().toInfinitive()
// doc.debug()

// console.log(doc.text('root'))
// doc.terms().forEach(t => {
//   let str = t.text('root')
//   console.log(str + '|')
// })


let doc = nlp('i NEED it')
doc.match('NEED', null, { caseSensitive: true }).debug()
