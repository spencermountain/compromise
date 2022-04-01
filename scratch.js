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

let txt = `I've seen worse`
// txt = `try and pass.`
// txt = `so I guess.`
// txt = `Kiss you `
// txt = ` I miss you`
// txt = ` work to address specific illnesses`
// txt = `the eldest son`
// txt = `if you cross a warden`
txt = `Once your troops get to where they are going, attack their power plants.`
txt = `You don't have to !`
txt = `Everyone he met told him`
txt = `to see what had happened, threw herself head foremost.`
txt = `caused the Princess to be carried into `
txt = `a bed all embroidered with gold and silver.`

let doc = nlp(txt).compute('root').debug().normalize('heavy')
doc.debug()
console.log(doc.text('root'))

// nlp(`i saw the game that the Toronto Maple Leafs won`).verbs().isSingular().debug()



