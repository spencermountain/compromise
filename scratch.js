var nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/values/src'))

let str = `the chandelier`
var doc = nlp(str)
// doc.match('old').prepend('new')
// doc.list[0].terms().map(t => {
//   console.log(t.normal + ':      ' + t.prev + '             ' + t.next)
// })
// doc.debug()
