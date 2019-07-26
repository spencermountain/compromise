var nlp = require('./src/index')
// nlp.verbose(true)
nlp.extend(require('./plugins/numbers/src'))

let res = nlp('and').map(d => {
  return d.replaceWith('or')
})
// res.debug()
// .debug()
// .numbers()
// .add(2)
// .debug()

// console.time('one')
// let doc = nlp('hello world')
// console.log(doc.has('#Klkj'))
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
// -----

// nlp('drink Salty Dogs').debug()

// console.log(doc.world.lexicon['ms'])
// -----

// let doc = nlp('her book belongs to her')
// let doc = nlp('his book belongs to him')
// let doc = nlp('his book is his')
// let doc = nlp('her book is hers')

// -----

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

// var r = nlp('July').debug()
