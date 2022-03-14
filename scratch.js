/* eslint-disable no-console, no-unused-vars */
import nlp from './src/two.js'
// import plg from './plugins/speech/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')
// nlp.verbose('chunker')

let txt = ''
txt = `please tell me you'll address the issue`
txt = `The boy committed a robbery, who you saw at the store `
txt = `tell the story to him`
txt = `tell him the story`
txt = `Of course she had the best of teachers, the Fairy Paribanou herself; but very few girls, in our time, devote so many hours to practice as dear Jaqueline.`
txt = `I wanna be bigger, stronger, drive a faster car`
txt = `every day the kitten tries to eat the mouse`
txt = `After dripping mustard all over his shirt.`
txt = `The store that the boy robbed is on the corner.`
// txt = `'Cause the world is spinning at the speed of light`
txt = `We had been to see her several times.`
txt = `simply allow yourself a treat`
txt = `he's the best`
// let doc = nlp(txt)

const lexicon = {
  buckinghamshire: 'Town',
  ayrshire: 'Town',
}
// add the words we should predict from
nlp.typeahead(lexicon, { min: 4 })
// create a document
let doc = nlp('i went to bucking', lexicon)
console.log(doc.text('implicit'))

let m = doc.match('buckinghamshire')
m.debug()
console.log(m.text('implicit'))