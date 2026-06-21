
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// import plg from './plugins/_experiments/cmd-k/src/plugin.js'
// nlp.plugin(plg)


// already tested for
nlp('simon says run').debug()

// redact misses google
console.log(nlp('Mary joined Google today').redact().text())

// paris has trailing period
console.log(nlp('I went to Paris.').places().out('array'))

// missing methods
nlp('it cost $2.50').money().currency()   // ❌ TypeError
nlp('two thirds').fractions().toText()    // ❌ TypeError
nlp('80%').percentages().toFraction()     // ❌ TypeError
nlp('$4.09CAD').money().currency()
nlp('1/2').fractions().toText()
nlp('80%').percentages().toFraction()