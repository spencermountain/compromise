/* eslint-disable no-console */
import { parseXml, forEachSync, topk } from '../giga.js'
import fs from 'fs'

const tag = 'JJ'
const reg = /ing$/

// const ids = ['0004']
let ids = []
for (let i = 1; i <= 10; i += 1) {
  let str = String(i).padStart(4, '0')
  ids.push(str)
}


; (async () => {
  await forEachSync(ids, async id => {
    console.log(`\ndoing ${id}:\n`)
    let list = await parseXml(id, tag)
    console.log('done')
    list = list.map(a => {
      let str = a[0] || ''
      return str.toLowerCase().trim()
    })
    list = list.filter(str => reg.test(str))
    let res = topk(list)
    console.log(res)
    fs.writeFileSync(`./learn/giga/result/${id}.json`, JSON.stringify(res, null, 2))
  })
  // ids.forEach();
  console.log('all-done.')
})()
