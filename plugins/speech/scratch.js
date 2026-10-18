import nlp from '../../src/three.js'
import speechPlugin from './src/plugin.js'
nlp.plugin(speechPlugin)

// const doc = nlp(`Calgary Flames. Louisville`)
// const doc = nlp(`sidewalk`)

// const doc = nlp(`science’s`)
// console.log(doc.syllables({ normalize: true }))

const doc = nlp(`it stars Alicia Silverstone and Paul Rudd`)
console.log(doc.people().syllables())
// [ [ 'back', 'to', 'win', 'ni', 'peg' ] ]
