import nlp from '../../src/three.js'
import mdPlugin from './src/plugin.js'
nlp.plugin(mdPlugin)

const text = `WEBVTT

02:09.240 --> 02:11.150
You'll never believe this, sir.

02:11.279 --> 02:13.076
We have to visit a brewery.
`

const doc = nlp.fromSubtitle(text)
doc.match('visit a #Noun').debug()
// │ 'visit'    - Verb, PresentTense, Infinitive
// │ 'a'        - Determiner
// │ 'brewery'  - Noun, Singular

// modify the document
doc.contractions().expand()
doc.match('brewery').replaceWith('pub')

// output valid .vtt subtitle
const str = doc.toSubtitle()
console.log(str)
