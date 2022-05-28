/* eslint-disable no-console, no-unused-vars */
import nlp from '../../src/three.js'
import fs from 'fs'
// import workerPool from './src/workerPool/index.js'


import { streamFile, workerPool, lazyParse } from './src/plugin.js'
nlp.plugin(lazyParse)
nlp.plugin(streamFile)
nlp.plugin(workerPool)

let file = `/Users/spencer/data/infinite-jest/infinite-jest.txt`
// file = `/Users/spencer/mountain/compromise/plugins/speed/tests/files/freshPrince.txt`
let begin = new Date()
let txt = fs.readFileSync(file).toString()

// let net = nlp.buildNet([
//   { match: 'every single #Noun' },
//   { match: 'not (a|one) #Noun' },
// ])
const doc = nlp.lazyParse(txt, 'every single #Noun')
doc.debug()
// doc.tagger()
// doc.debug()
// let m = doc.maybeMatch(net).debug()
// console.log(m._cache)

// let res = nlp(txt).match('every single #Noun')
// console.log(res.length, 'matches')


// let doc = await nlp.workerPool(txt, 'my #Adjective #Noun')
// doc.debug()
// console.log(doc.length)
console.log((new Date().getTime() - begin.getTime()) / 1000, 's')

// nlp.streamFile(file, (s) => {
//   return s.match('every single #Noun')
// }).then(res => {
//   console.log(res.length, 'matches')
//   res.debug()
//   console.log((new Date().getTime() - begin.getTime()) / 1000, 's')
// })

