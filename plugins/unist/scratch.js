import nlp from '../../src/three.js'
import mdPlugin from './src/markdown/plugin.js'
nlp.plugin(mdPlugin)

const md = 'She **walked** to [school](https://school.org)'
const doc = nlp.fromMarkdown(md)
doc.debug('ast')

console.log(doc.has('walked to')) // want rue

doc.match('walked').replaceWith('ran')
doc.updateTree()

const out = doc.markdown()
console.log(out)
// 'She **ran** to [school](https://school.org)'
