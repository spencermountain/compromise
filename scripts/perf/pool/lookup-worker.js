/* eslint-disable no-console, no-unused-vars */
import { parentPort } from 'worker_threads'
// const nlp = require('../../src')
import nlp from './_lib.js'

const matches = [
  `Toronto Aeros`,
  `Toronto Arenas`,
  `Toronto Aura Lee`,
  `Toronto 228th Battalion (NHA)`,
  `Toronto Blueshirts`,
  `Toronto Jr. Canadiens`,
  `Dixie Beehives (2005–11)`,
  `East York Lyndhursts`,
  `Toronto Granites`,
  `Toronto Knob Hill Farms`,
  `Toronto Lions`,
  `Toronto Maple Leafs`,
  `Toronto Marlboros`,
  `Toronto Marlies`,
  `Mimico Monarchs`,
  `Toronto Native Sons`,
  `Niagara-on-the-Lake Predators`,
  `North York Rangers`,
  `North York Rangers (1967–1984)`,
  `Toronto Ontarios`,
  `Toronto Professional Hockey Club`,
  `Toronto Ravinas`,
  `Toronto Roadrunners`,
  `Royal York Royals`,
  `Toronto St. Patricks`,
  `Toronto Shamrocks`,
  `St. Michael's Buzzers`,
  `Toronto Tecumsehs`,
  `Toronto Toros`,
  `Toronto Attack`,
  `Toronto Furies`,
  'and then',
  `Toronto Jr. Aeros`,
  `Toronto Neil McNeil Maroons`,
  `Toronto Patriots`,
  `Toronto Six`,
  `Toronto St. Michael's Majors`,
  `Toronto Varsity Blues men's ice hockey`,
  `Torontos`,
  `Toronto Wellingtons`,
  `West Toronto Nationals`,
  `Toronto Young Rangers`,
]
const trie = nlp.buildTrie(matches)

const doit = async function (txt) {
  const doc = nlp(txt)
  let count = 0
  // matches.forEach(reg => {
  //   count += doc.match(reg).length
  // })
  count += doc.lookup(trie).length
  console.log(count)
  doc.json()
}

parentPort.on('message', async msg => {
  const begin = new Date()
  doit(msg)
  const end = new Date()
  const delta = (end.getTime() - begin.getTime()) / 1000
  parentPort.postMessage(delta)
})

// new Promise(async resolve => {
//   parentPort.postMessage(r)
//   resolve(r)
// })
