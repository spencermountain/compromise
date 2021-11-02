import nlp from '../../src/two.js'
import { forEachSync } from '../giga.js'
import fs from 'fs'
import fromPast from './models/fromPast.js'
import { convert } from '/Users/spencer/mountain/suffix-thumb/src/index.js'

// const ids = ['0004']
let ids = []
for (let i = 1; i <= 10; i += 1) {
  let str = String(i).padStart(4, '0')
  ids.push(str)
}

// const toInf = function (str) {
//   return nlp.methods().two.transform.verbToInfinitive(str, nlp.model(), 'PastTense')
// }

const toInf = function (str) {
  return convert(str, fromPast)
}

// let right = 0
// let wrong = 0
// let total = 0
// let all = {}
// ids.forEach(id => {
//   console.log(id)
//   let json = fs.readFileSync(`/Users/spencer/mountain/compromise/learn/getInfinitive/result/${id}.json`).toString()
//   json = JSON.parse(json)
//   Object.keys(json).forEach(k => {
//     total += 1
//     let have = toInf(k)
//     let want = json[k]
//     console.log(have, want)
//     if (have !== want) {
//       wrong += 1
//       // console.log(k, ' -> ', have, want)
//       all[k] = want
//     } else {
//       right += 1
//     }
//   })
// })
// // console.log(JSON.stringify(all, null, 2))
// console.log(total)
// const percent = (part, total) => {
//   let num = (part / total) * 100;
//   num = Math.round(num * 10) / 10;
//   return num;
// };
// let p = percent(right, wrong + right)
// console.log(wrong, right, p + '%')


console.log(toInf('bagged', 'PastTense'))