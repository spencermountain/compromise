var nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/values/src'))
// let m = nlp('a spencer  kelly eats the glue z')
//   // .match('a [spencer kelly] eats')
//   .match('a [spencer kelly] eats')
//   .debug()
// console.time('one')
// let doc = nlp.tokenize('hello world')
// doc.match('western').debug()
// console.timeEnd('one')

// console.time('two')
// let doc2 = nlp('i am the very model of a modern major seven general. I am animal vegetable and mineral.')
// console.timeEnd('two')

// console.time('three')
// let doc3 = nlp('one and spensdfcer and two three fosdfur five. tewo and spenssdfcer and fiffve and six')
// console.timeEnd('three')

// const corpus = require('./stress/node_modules/nlp-corpus')
// let txt = corpus.sotu.array()[8]
// console.time('sotu')
// let main = nlp(txt)
// console.timeEnd('sotu')

// // let doc = nlp('Toronto Toronto Toronto detroit')
// //   .match('#Noun+ detroit')
// //   .debug()
// let doc = nlp('foo bar')
// // doc.match('foo [bar]').debug()
// doc.replace('foo bar', 'foo baz')
// console.log(doc.out())

// let doc = nlp('ralf really eats the glue').match('* [eats]')
// .debug()
// console.log(doc.out('array'))

// console.log(doc.world.lexicon.yesterday)

var r = nlp('it is funny and weird')
r.match('_nny').debug()
