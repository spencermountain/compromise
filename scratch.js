
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// import plg from './plugins/_experiments/cmd-k/src/plugin.js'
// nlp.plugin(plg)


let txt = 'toes'
// txt = 'rooms'
// txt = 'students'
// txt = 'trees'
// txt = 'eyed'
// txt = 'sized'
// txt = 'faced'
// txt = 'admitted'
// txt = 'substances'
// txt = 'crocodiles'
// txt = 'affairs'
// txt = 'buddies'
// txt = 'residents'
// txt = 'girls'
// txt = 'hills'
// txt = 'commitments'
// txt = 'units'
// txt = 'banks'
// txt = 'toys'
// txt = 'lights'
// txt = 'grounds'
// txt = 'albertans'
// txt = 'towers'

// txt = `i sent the documents up the hill`
// txt = `he would up stage his friend`
// txt = `he couldn't off gas`
// txt = `he got up over the hill`
// txt = 'piled up over'
// text = ``
// let doc = nlp(txt).debug()
// doc.compute('root')
// console.log(doc.text('root'))


// Underscore example
let text = `
To the window, to the wall below.
_________________________________________________`;
let doc = nlp(text);
console.log(doc.debug());

// console.log(doc.docs)