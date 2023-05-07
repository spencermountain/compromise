import nlp from '../../../src/three.js'
import plg from './src/plugin.js'
nlp.plugin(plg)

let str = ''
str = `I prefer the morning flight through Denver. it was cool,
oh yeah nice`
let doc = nlp(str)
// console.log(doc.lines())
// let tree = doc.ast()
// console.dir(tree, { depth: 10 })
doc.chunks().debug('chunker')
