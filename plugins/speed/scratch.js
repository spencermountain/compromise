import nlp from '../../src/three.js'
import fs from 'node:fs'
import path from 'node:path'
import plg from './src/plugin.js'
nlp.plugin(plg)
import { fileURLToPath } from 'url'
const dir = path.dirname(fileURLToPath(import.meta.url))
const file = `../../scripts/bench/infinite-jest.txt`
// file = `/Users/spencer/mountain/compromise/plugins/speed/tests/files/freshPrince.txt`
const begin = new Date()
const txt = fs.readFileSync(path.join(dir, file)).toString()

const net = nlp.buildNet([{ match: 'every single #Noun' }, { match: 'not (a|one) #Noun' }])
// const doc = nlp.lazy(txt, 'every single #Noun')
const doc = nlp.lazy(txt, net)
// doc.debug()

// let doc = nlp(txt).match('every single #Noun')
// let doc = nlp(txt).match(net)
// doc.debug()
console.log(doc.length, 'matches')

// let doc = await nlp.workerPool(txt, 'my #Adjective #Noun')
// doc.debug()
// console.log(doc.length)
console.log((new Date().getTime() - begin.getTime()) / 1000, 's')
