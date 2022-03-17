/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/speech/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')
// nlp.verbose('chunker')

let txt = ''
txt = `please tell me you'll address the issue`
txt = `The boy committed a robbery, who you saw at the store `
txt = `tell the story to him`
txt = `tell him the story`
txt = `I wanna be bigger, stronger, drive a faster car`
txt = `every day the kitten tries to eat the mouse`
txt = `After dripping mustard all over his shirt.`
txt = `The store that the boy robbed is on the corner.`
// txt = `'Cause the world is spinning at the speed of light`
txt = `We had been to see her several times.`
txt = `simply allow yourself a treat`
txt = `he's the best and will always be the best`

// let m = nlp('the dog sat').insertAfter('and')
// console.log(m.pointer)
// m.debug()

let doc = nlp('one two match three four')
let m = doc.match('match .') // 'match three'
doc.remove('three')
console.log('==============')
// m.docs
console.log('|' + m.text())
console.log('|' + m.text())


// let s = doc.sentences()
// s.toFutureTense()
// console.log(s.fullPointer)
// s.debug()

