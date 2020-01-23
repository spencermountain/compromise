const test = require('tape')
const nlp = require('./_lib')
const fs = require('fs')
const path = require('path')
const https = require('https')

const fetch = function(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, resp => {
        let data = ''
        resp.on('data', chunk => {
          data += chunk
        })
        resp.on('end', () => {
          resolve(JSON.parse(data))
        })
      })
      .on('error', err => {
        console.log('Error: ' + err.message)
        reject()
      })
  })
}

const TEST_COUNT = 5

function calculateRegression(x, y) {
  const sumX = x.reduce((acc, v) => acc + v, 0)
  const sumY = y.reduce((acc, v) => acc + v, 0)

  const avgX = sumX / x.length
  const avgY = sumY / y.length

  let sumSqX = 0
  for (let i = 0; i < x.length; i++) {
    sumSqX += Math.pow(x[i] - avgX, 2) // this will never change unless we add more tests...
  }

  let sumP = 0
  for (let i = 0; i < y.length; i++) {
    sumP += (x[i] - avgX) * (y[i] - avgY)
  }

  const b = sumP / sumSqX
  const a = avgY - b * avgX
  const result = `${b.toFixed(5)}X ${a > 0 ? '+' : '-'} ${a.toFixed(5)}`

  return { regression: result, average: avgY.toFixed(5) }
}

test('Performance', function(t) {
  fetch('https://unpkg.com/nlp-corpus@3.3.0/builds/nlp-corpus-1.json').then(res => {
    const outputPath = path.join(__dirname, './performance.results.json')

    let expected = {}
    if (fs.existsSync(outputPath)) {
      expected = JSON.parse(fs.readFileSync(outputPath))
    }

    const textArr = res.sort((a, b) => a.length - b.length)
    const x = []
    const y = []

    for (let i = 0; i < textArr.length; i++) {
      const text = textArr[i]
      const yI = []

      console.group('Test', i)

      for (let j = 0; j < TEST_COUNT; j++) {
        console.log('--', j)
        const _nlp = nlp.clone() // Avoid caching?
        const start = Date.now()
        _nlp(text)
        const end = Date.now()

        yI.push(end - start)
      }

      x.push(text.length)
      y.push(yI.reduce((acc, v) => acc + v, 0) / yI.length)

      console.groupEnd()
    }

    const regression = calculateRegression(x, y, t)
    const diff = Math.abs(regression.average - expected.average).toFixed(5)
    const results = Object.assign({ x, y, key: { x: 'Length', y: 'Time' }, diff }, regression)

    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2))

    console.log('Previous average:', expected.average)
    console.log('Current average:', results.average)
    console.log('Performance change:', diff)

    t.true(diff < 20, 'Should not see large performance change between runs - unless you did something awesome!')

    t.end()
  })
})
