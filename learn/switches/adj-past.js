/* eslint-disable no-console */
import { forEachSync, topk, streamXml } from '../giga.js'
import fs from 'fs'


// kick them off
const parseXml = function (id, tag1, tag2) {
  let list = []
  const parseEN = function (item) {
    item.w = item.w || []
    let found = item.w.filter(o => o['$'].tree === tag1 || o['$'].tree === tag2)
    found = found.map(o => [o['$text'], o['$'].tree])
    list = list.concat(found)
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

const res = {}
const tag1 = 'JJ'
const tag2 = 'VBD'

const ids = ['0004']
  // let ids = []
  // for (let i = 1; i <= 10; i += 1) {
  //   let str = String(i).padStart(4, '0')
  //   ids.push(str)
  // }


  ; (async () => {// eslint-disable-line
    await forEachSync(ids, async id => {
      console.log(`\ndoing ${id}:\n`)
      let list = await parseXml(id, tag1, tag2)
      console.log('done')
      list.forEach(a => {
        let str = a[0] || ''
        str = str.toLowerCase().trim()
        res[str] = res[str] || [0, 0]
        if (a[1] === tag1) {
          res[str][0] += 1
        }
        if (a[1] === tag2) {
          res[str][1] += 1
        }
      })
      let final = Object.keys(res).filter(k => {
        return res[k][0] > 1 && res[k][1] > 1
      })
      final = final.map(k => [k, res[k]])
      console.log(JSON.stringify(final, null, 2))
      // fs.writeFileSync(`./learn/giga/result/${id}.json`, JSON.stringify(res, null, 2))
    })
    // ids.forEach();
    console.log('all-done.')
  })()
