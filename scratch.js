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
txt = `I'd phoned`
// let doc = nlp(txt)
// doc.debug()

// let doc = nlp('i went to Gloop University in Paris, France, with John H. Smith')
// let arr = doc.topics().out('array')
// console.log(arr)

// console.log(nlp.parseMatch(`[<word>~atlk~]`, { fuzzy: 0.5 }))
let doc = nlp('i went on a talk')

let m = doc.match('i ~ewnt~ on a [~atlk~]', null, { fuzzy: 0.74 })
m = doc.match('i ~ewnt~ on a [<word>~atlk~]', 'word', { fuzzy: 0.74 })
m.debug()