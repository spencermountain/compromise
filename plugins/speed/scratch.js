/* eslint-disable no-console, no-unused-vars */
import nlp from '../../src/three.js'
import fs from 'fs'


import plg from './src/plugin.js'
nlp.plugin(plg)

let file = `/Users/spencer/data/infinite-jest/infinite-jest.txt`
// file = `/Users/spencer/mountain/compromise/plugins/speed/tests/files/freshPrince.txt`
let begin = new Date()
let txt = fs.readFileSync(file).toString()

let net = nlp.buildNet([
  { match: 'every single #Noun' },
  { match: 'not (a|one) #Noun' },
])
// const doc = nlp.lazy(txt, 'every single #Noun')
const doc = nlp.lazy(txt, net)
doc.debug()

// let doc = nlp(txt).match('every single #Noun')
// let doc = nlp(txt).match(net)
// doc.debug()
console.log(doc.length, 'matches')


// let doc = await nlp.workerPool(txt, 'my #Adjective #Noun')
// doc.debug()
// console.log(doc.length)
console.log((new Date().getTime() - begin.getTime()) / 1000, 's')
