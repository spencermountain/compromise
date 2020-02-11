const nlp = require('../../../tests/_lib')
const fs = require('fs')
const path = require('path')
const fetch = require('./_fetch')
const calculateRegression = require('./_regression')

const TEST_COUNT = 5
const node_version = 'v10.13.0'
if (node_version !== process.version) {
  console.log("\n(running '" + process.version + "' instead of '" + node_version + "')\n")
}

fetch('https://unpkg.com/nlp-corpus@3.3.0/builds/nlp-corpus-1.json').then(res => {
  const outputPath = path.join(__dirname, './_performance.json')
  let expected = {}
  if (fs.existsSync(outputPath)) {
    expected = JSON.parse(fs.readFileSync(outputPath))
  }

  const textArr = res.sort((a, b) => a.length - b.length)
  const x = []
  const y = []

  const full = Date.now()
  for (let i = 0; i < textArr.length; i++) {
    const text = textArr[i]
    const yI = []

    console.group('Text', i)

    for (let j = 0; j < TEST_COUNT; j++) {
      const _nlp = nlp.clone() // Avoid caching?
      const start = Date.now()
      _nlp(text)
      const end = Date.now()
      const diff = end - start
      console.log('  ' + diff + ' ms')
      yI.push(diff)
    }

    x.push(text.length)
    y.push(yI.reduce((acc, v) => acc + v, 0) / yI.length)

    console.groupEnd()
  }

  const regression = calculateRegression(x, y)
  const diff = Math.abs(regression.average - expected.average).toFixed(5)
  const results = Object.assign({ x, y, key: { x: 'Length', y: 'Time' }, diff }, regression)

  // fs.writeFileSync(outputPath, JSON.stringify(results, null, 2))

  console.log('\n')
  console.log('Expected:', Math.ceil(expected.average) + 'ms')
  console.log('Current :', Math.ceil(results.average) + 'ms')
  console.log('Diff:', Math.ceil(diff) + 'ms\n')
  let all = Math.ceil(Date.now() - full) / 1000
  console.log('Full thing: ' + all + 's\n')

  // Should we decide on a good value to check against? Might as well just log it for now
  //t.true(diff < 20, 'perfomance is stable')
  // if (diff > 30) {
  //   throw 'speed-difference of ' + diff
  // }
})
