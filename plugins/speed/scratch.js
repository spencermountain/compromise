/* eslint-disable no-console, no-unused-vars */
import nlp from '../../src/three.js'
import fs from 'fs'
// import workerPool from './src/workerPool/index.js'


import { streamFile, workerPool } from './src/plugin.js'
nlp.plugin(streamFile)
nlp.plugin(workerPool)

let file = `/Users/spencer/data/infinite-jest/infinite-jest.txt`
// file = `/Users/spencer/mountain/compromise/plugins/speed/tests/files/freshPrince.txt`
let txt = fs.readFileSync(file).toString()
let begin = new Date()

// let res = nlp(txt).match('every single #Noun')
// console.log(res.length, 'matches')

let net = nlp.buildNet([
  { match: 'every single #Noun' },
  { match: 'not (a|one) #Noun' },
])
let doc = await nlp.workerPool(txt, net)
doc.debug()

// nlp.streamFile(file, (s) => {
//   return s.match('every single #Noun')
// }).then(res => {
//   console.log(res.length, 'matches')
// })
console.log((new Date().getTime() - begin.getTime()) / 1000, 's')

