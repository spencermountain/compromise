/* eslint-disable no-console, no-unused-vars */
import combineRanges from './src/1-one/tokenize/methods/02-terms/03-ranges.js'
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')
let arr = [
  'at&t',
  'amazon.com',
  'apple inc.',
  'audi',
  'bacardi',
  'cadillac',
  'coco chanel',
  'fc barcelona',
  'fifa',
  'firefox',
  'halliburton',
  'ikea',
  'klm',
  'lexus',
  'manchester united',
  'mcgill university',
  'mercedes-benz',
  'michelin',
  'nivea',
  'pepsi',
  'philips',
  'premier league',
  'real madrid',
  'roman empire',
  'scientology',
  'smirnoff',
  'wikileaks',
  'wikipedia',
]
let count = 0
let missing = []
arr.forEach(str => {
  let doc = nlp(str)
  if (!doc.organizations().found) {
    console.log(str)
    count += 1
    missing.push(str)
  }
})
console.log(count, arr.length)
console.log(JSON.stringify(missing, null, 2))
