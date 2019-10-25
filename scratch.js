const nlp = require('./src/index')
// const corpus = require('nlp-corpus')
nlp.verbose(true)
// nlp.extend(require('./plugins/dates/src'))

nlp.extend(function(Doc, world) {
  /** add some tags */
  world.addTags({
    Character: {
      isA: ['Fiction', 'FemaleName'],
      notA: 'Adjective',
    },
  })
})

/*
2. ~walk~ match
3. .swap()
*/

let m = nlp('john smith was really working')
m.debug()

// let doc = nlp
//   .tokenize('jeff')
//   .tag('Person')
//   .tag('Comparable')
//   .debug()

// console.log('Person:', doc.world.tags.Person)
// console.log('')
// console.log('MaleName:', doc.world.tags.MaleName)
