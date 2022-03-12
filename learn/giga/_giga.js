import XmlStream from 'xml-stream'
import fs from 'fs'

const gigaFr = '/Users/spencer/data/opus/en/giga-fren/xml/en/giga-fren.release2.fixed.'

const streamXml = function (file, cb, end) {
  const stream = fs.createReadStream(file)
  const xml = new XmlStream(stream)
  xml.collect('w')
  xml.on('endElement: s', function (item) {
    cb(item, xml)
  })
  xml.on('end', end)
}

const parseEn = function (id, cb) {
  return new Promise((resolve, reject) => {
    try {
      streamXml(gigaFr + `${id}.xml`, cb, () => {
        resolve()
      })
    } catch (e) {
      console.log(e) // eslint-disable-line
      reject(e)
    }
  })
}

async function doDocs(array, cb) {
  for (let i = 0; i < array.length; i++) {
    await parseEn(array[i], cb)
  }
  console.log('--done-- ') // eslint-disable-line
}
export default doDocs