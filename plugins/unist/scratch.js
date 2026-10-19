import nlp from '../../src/three.js'
import plugin from './src/plugin.js'
import { inspect } from 'unist-util-inspect'

nlp.plugin(plugin)

const doc = nlp(`wow windows! I don't think I can afford this place`)
const tree = doc.toAst({ tags: false, positions: false })
console.log(inspect(tree))

const doc2 = nlp.fromAst(tree)
doc2.debug()
