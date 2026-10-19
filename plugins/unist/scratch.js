import nlp from '../../src/three.js'
import plugin from './src/plugin.js'
nlp.plugin(plugin)

const doc = nlp('I went to school.')

console.log(doc.toAst())
