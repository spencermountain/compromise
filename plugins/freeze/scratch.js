import nlp from '../../src/three.js'
import plg from './src/plugin.js'
nlp.plugin(plg)

let doc = nlp('the dr who is a a shoe in the closet')
let m = doc.match('dr who').tag('Noun')
m.freeze() // ☃️
doc.isFrozen().debug()
