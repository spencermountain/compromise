const nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))

// nlp('WE’RE NOT WORTHY!').debug()

// #585
// nlp('the second test message').debug()
// nlp('the generative approach and the discriminative approach." ').debug()

//369
// nlp('lied').debug()
// nlp('owed').debug()
// nlp('aced').debug()
// nlp('vied').debug()
// nlp('husked').debug()
// nlp('masked').debug()
nlp('planned').debug()

// let arr = ['aged', 'baked', 'coming',
// 'moving',
// 'joking',
// 'poking',
// 'naming',
// 'aching',
// 'tuning',
// 'hazing',
// ]
// arr.forEach(str => {
//   console.log(
//     nlp(str)
//       .verbs()
//       .conjugate()[0]
//   )
// })

// console.log(
//   nlp('owed')
//     .verbs()
//     .conjugate()[0]
// )
