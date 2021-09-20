/* eslint-disable no-console */
import parseXml from './getByTag.js'
import fs from 'fs'
import path from 'path'

const tag = 'JJ'
const reg = /ed$/

// const ids = ['0004']
let ids = []
for (let i = 1; i <= 10; i += 1) {
  let str = String(i).padStart(4, '0')
  ids.push(str)
}

async function forEachSync(array, callback) {
  for (let i = 0; i < array.length; i++) {
    await callback(array[i], i, array)
  }
}

const topk = function (arr) {
  let obj = {}
  arr.forEach(a => {
    obj[a] = obj[a] || 0
    obj[a] += 1
  })
  let res = Object.keys(obj).map(k => [k, obj[k]])
  res = res.sort((a, b) => (a[1] > b[1] ? -1 : 0))
  return res.map(a => a[0])
}

;(async () => {
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
