import doDocs from './_giga.js'
import tagMap from './_tagMap.js'

let ids = []
for (let i = 1; i <= 10; i += 1) {
  let str = String(i).padStart(4, '0')
  ids.push(str)
}
ids = ['0004']

let jjs = []
let rbs = []

const doSentence = function (s) {
  s.w = s.w || []
  s.w.forEach(t => {
    let tag = tagMap[t['$'].tree]
    if (tag === 'Adverb') {
      rbs.push(t['$'].lem)
    }
    if (tag === 'Adjective') {
      jjs.push(t['$'].lem)
    }
  })
}

const attempt = function (str = '') {
  str = str.replace(/ually$/, 'ual')
  str = str.replace(/ially$/, 'ial')
  str = str.replace(/cally$/, 'c')
  str = str.replace(/eally$/, 'eal')
  str = str.replace(/rally$/, 'ral')
  str = str.replace(/nally$/, 'nal')
  str = str.replace(/mally$/, 'mal')
  str = str.replace(/ally$/, '')
  str = str.replace(/ily$/, 'y')
  str = str.replace(/bly$/, 'ble')
  str = str.replace(/ly$/, '')
  return str
}



let correct = 0
doDocs(ids, doSentence).then(() => {
  console.log('done')
  jjs = new Set(jjs)
  rbs.forEach(rb => {
    let j = attempt(rb)
    if (!jjs.has(j) || rb.endsWith('y')) {
      console.log(rb)
    } else {
      correct += 1
    }
  })
  console.log(correct.toLocaleString(), rbs.length.toLocaleString())
  // fs.writeFileSync('./jjs.js', 'export default ' + JSON.stringify(jjs))
  // fs.writeFileSync('./rbs.js', 'export default ' + JSON.stringify(rbs))
  // console.log(jjs.length)
  // console.log(rbs.length)
})
