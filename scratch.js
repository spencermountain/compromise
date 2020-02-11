const nlp = require('./src/index')
let txt = require('./scripts/test/speed/_sotu-text.js')
// nlp.verbose(true)
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/scan/src'))

// nlp(`okay, do not use reverse psychology`).debug()
// nlp(`April, June, and September`).debug()
// let doc = nlp(`so good`).debug()
// console.log(doc.list[0].cache)

let str = `What's with these homies dissin' my girl? Why do they gotta front? 
  
What did we ever do to these guys that made them so violent?

`
let doc = nlp(str).join()
doc.debug()
// t.equal(doc.length, 1, 'one phrase')
// console.log('pre')
// doc = doc.splitOn('we ever')
// console.log('post')
// t.equal(doc.length, 3, 'three phrases now')
