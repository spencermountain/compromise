const nlp = require('./src/index')
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))
nlp.extend(require('./plugins/typeahead/src'))
// nlp.extend(require('./plugins/sentences/src'))
// nlp.verbose(true)

const lexicon = {
  bedfordshire: 'Town',
  aberdeenshire: 'Town',
  buckinghamshire: 'Town',
  argyllshire: 'Town',
  bambridgeshire: 'Town',
  cheshire: 'Town',
  ayrshire: 'Town',
}
// add the words we should predict from
nlp.typeahead(lexicon, { min: 2 })
// create a document
let doc = nlp('i went to Buc', lexicon)
// let m = doc.match('buck')
// console.log(m.text())
// 'bucking'
// console.log(m.text('implicit'))
doc.debug()
