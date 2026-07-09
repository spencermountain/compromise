
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// import plg from './plugins/_experiments/cmd-k/src/plugin.js'
// nlp.plugin(plg)
// nlp.verbose(true)


// already tested for
// nlp('simon says run').debug()

// redact misses google
// console.log(nlp('Mary joined Google today').debug().redact().text())


// let doc = nlp('I live at 4 main street. I work at the bank.').debug()
// console.log(doc.out('spec'))
// nlp('Call John Smith at (800) 555-0000.').debug().redact().debug()
// nlp('i met her').debug()

// paris has trailing period
// console.log(nlp('I went to Paris.').places().out('array'))

let doc = nlp(`I ate turkey for dinner.`)
doc.debug()
// doc.redact().debug()
// missing methods
// let out = nlp('it cost 2.50 yuan').debug().money().json()
// console.log(out)
// nlp('two thirds').fractions().toText()   
// nlp('80%').percentages().toFraction()    
// nlp('$4.09CAD').money().currency()
// nlp('1/2').fractions().toText()
// nlp('80%').percentages().toFraction()