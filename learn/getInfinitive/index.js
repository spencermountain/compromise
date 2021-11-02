/* eslint-disable no-console */
import { streamXml, forEachSync } from '../giga.js'
import fs from 'fs'

const tag = 'VBN'

// const ids = ['0004']
let ids = []
for (let i = 1; i <= 10; i += 1) {
  let str = String(i).padStart(4, '0')
  ids.push(str)
}

let all = {}

// kick them off
const parseXml = function (id, tag) {
  let list = []
  const parseEN = function (item) {
    item.w = item.w || []
    let found = item.w.filter(o => o['$'].tree === tag)
    // found = found.map(o => [o['$text'], o['$'].lem])
    found.forEach(o => {
      let word = o['$text']
      let lem = o['$'].lem
      if (!word || !lem) {
        return
      }
      word = word.toLowerCase()
      lem = lem.toLowerCase()
      if (all[word] && all[word] !== lem) {
        console.log(word, lem, all[word])
      }
      all[word] = lem
    })
    return true
  }
  return new Promise(resolve => {
    const doneMaybe = () => {
      console.log('done')
      resolve(list)
    }
    streamXml(`/Users/spencer/data/opus/en/giga-fren/xml/en/giga-fren.release2.fixed.${id}.xml`, parseEN, doneMaybe)
  })
}
export default parseXml


  ; (async () => {
    await forEachSync(ids, async id => {
      console.log(`\ndoing ${id}:\n`)
      let list = await parseXml(id, tag)
      console.log('done')
      fs.writeFileSync(`./learn/getInfinitive/result/${id}.json`, JSON.stringify(all, null, 2))
    })
    // ids.forEach();
    console.log('all-done.')
  })()
