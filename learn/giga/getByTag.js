/* eslint-disable no-console */
import fs from 'fs'
import XmlStream from 'xml-stream'

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

// kick them off
const parseXml = function (id, tag) {
  let list = []
  const parseEN = function (item) {
    item.w = item.w || []
    let found = item.w.filter(o => o['$'].tree === tag)
    found = found.map(o => [o['$text'], o['$'].lem])
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
export default parseXml
