import XmlStream from 'xml-stream'
import fs from 'fs'


const streamXml = function (file, cb, end) {
  const stream = fs.createReadStream(file)
  const xml = new XmlStream(stream)
  xml.collect('w')
  xml.on('endElement: s', function (item) {
    cb(item, xml)
  })
  xml.on('error', function (e) {
    console.log('error')
    console.log(e)
  })
  xml.on('end', end)
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

async function forEachSync(array, callback) {
  for (let i = 0; i < array.length; i++) {
    await callback(array[i], i, array)
  }
}
export { streamXml, forEachSync, topk }