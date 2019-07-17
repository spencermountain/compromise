var nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/values/src'))

let str = `for gaggle's budget`
var doc = nlp(str).debug()
// doc.match('old').prepend('new')
// doc.list[0].terms().map(t => {
//   console.log(t.normal + ':      ' + t.prev + '             ' + t.next)
// })
// doc.debug()
