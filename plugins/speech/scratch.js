import nlp from '../../src/three.js'
import speechPlugin from './src/plugin.js'
nlp.plugin(speechPlugin)

// const doc = nlp(`Calgary Flames. Louisville`)
// const doc = nlp(`sidewalk`)

const doc = nlp(`BACK to Winnipeg!`)
console.log(doc.syllables({ normalize: true }))
// [ [ 'back', 'to', 'win', 'ni', 'peg' ] ]
