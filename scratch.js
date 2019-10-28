const nlp = require('./src/index')
nlp.verbose(true)
nlp.extend(require('./plugins/sentences/src'))

// nlp.extend(function(Doc, world) {
//   /** add some tags */
//   world.addTags({;
//     Character: {
//       isA: ['Fiction', 'FemaleName'],
//       notA: 'Adjective',
//     },
//   })
// })

// let doc = nlp.tokenize('matt does matthew not')
// doc.terms(0).tag('Person')
// doc.terms(2).tag('Person')
// let m = doc.match('(^#Person|#Person$)')
// m.debug()

nlp
  .tokenize('one hundred')
  .tag('#Value')
  .match('(#Value|#Time) (am|pm)')
  .debug()
