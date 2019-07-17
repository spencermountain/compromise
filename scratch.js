var nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/values/src'))

// let str = `before gonna after`
let str = `before hello after`
var doc = nlp(str)
doc.match('hello').append('lkj')
doc.list[0].terms().map(t => {
  console.log(t.normal + ':      ' + t.prev + '             ' + t.next)
})
doc.debug()
