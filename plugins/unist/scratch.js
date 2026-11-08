import nlp from '../../src/three.js'
import plugin from './src/plugin.js'
import { ParseEnglish } from 'parse-english'
import { inspect } from 'unist-util-inspect'
nlp.plugin(plugin)

const tree = new ParseEnglish().parse(`wow windows! I don't think I can afford this place`)
console.log(inspect(tree))
//
// const doc = nlp(`wow windows! I don't think I can afford this place`)
// const tree = doc.toAst({ tags: false, positions: false })
// console.log(inspect(tree))
//
const doc = nlp.fromAst(tree)
doc.tagger()
doc.debug()
