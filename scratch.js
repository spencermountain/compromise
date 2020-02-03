const nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))

let doc = nlp('one two three four')
let res = doc.lookup(['two three four', 'one', 'blah'])
// let res = doc.lookup({ 'two three four': 'foo', one: 'bloo', blah: 'no' })
console.log(res)
