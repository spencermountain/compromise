
import nlp from './src/three.js'
import plg from './plugins/dates/src/plugin.js'
// import plg from './plugins/_experiments/cmd-k/src/plugin.js'
// nlp.plugin(plg)
nlp.verbose(true)


// already tested for
let doc = nlp('a 600 GB harddrive').debug()
doc.numbers().debug()
// nlp("june of '98" ).debug()
// missing methods
// let out = nlp('it cost 2.50 yuan').debug().money().json()
// console.log(out)
// nlp('two thirds').fractions().toText()   
// nlp('80%').percentages().toFraction()    
// nlp('$4.09CAD').money().currency()
// nlp('1/2').fractions().toText()
// nlp('80%').percentages().toFraction()