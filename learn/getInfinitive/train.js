import nlp from '../../src/two.js'
import fs from 'fs'
import { find } from '/Users/spencer/mountain/suffix-thumb/src/index.js'

// const ids = ['0004']
let ids = []
for (let i = 1; i <= 10; i += 1) {
  let str = String(i).padStart(4, '0')
  ids.push(str)
}

let all = {}

ids.forEach(id => {
  let json = fs.readFileSync(`/Users/spencer/mountain/compromise/learn/getInfinitive/result/${id}.json`).toString()
  json = JSON.parse(json)
  Object.assign(all, json)
})

let pairs = Object.entries(all)
// console.log(pairs.filter(a => /ged$/.test(a[0])))

let model = find(pairs)
// console.dir(model, { depth: 15 })
console.log(JSON.stringify(model, null, 2))