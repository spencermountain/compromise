
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// import plg from './plugins/_experiments/cmd-k/src/plugin.js'
// nlp.plugin(plg)



nlp('simon says run').debug()

console.log(nlp('Mary joined Google today').redact().text())


console.log(nlp('I went to Paris.').places().out('array'))



nlp('it cost $2.50').money().currency()   // ❌ TypeError
nlp('two thirds').fractions().toText()    // ❌ TypeError
nlp('80%').percentages().toFraction()     // ❌ TypeError
console.log(nlp('$4.09CAD').money().currency())

console.log(nlp('1/2').fractions().toText())

console.log(nlp('80%').percentages().toFraction())