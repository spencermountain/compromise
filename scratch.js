const nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))

// let doc = nlp('one two three four')
// let m = doc.match('one [two] three [four]')
// console.log(m.groups())
// console.log(m.list[0].groups)
// m.debug()

// 'one two three four'.match(/one (?<two>two) three/)
nlp.extend((Doc, world) => {
  // add new tags
  world.addWords({
    mi: ['Possessive'],
  })
})
let doc = nlp('hello mi')
