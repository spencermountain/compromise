const Pool = require('./pool/pool')
const fetch = require('./_fetch')

// const BASELINE = 92 //node 12, 2017 macbook
const BASELINE = 67 //node 12, 2020 mac mini

if (!process.version.match(/^v16\./)) {
  console.warn('Warn: Expecting node v16.x - got ' + process.version)
}

let docs = [
  'nlp-corpus-1.json',
  'nlp-corpus-2.json',
  'nlp-corpus-3.json',
  'nlp-corpus-4.json',
  'nlp-corpus-5.json',
  'nlp-corpus-6.json',
  'nlp-corpus-7.json',
  'nlp-corpus-8.json',
  'nlp-corpus-9.json',
  'nlp-corpus-10.json',
]

const fetchAll = function (urls) {
  return Promise.all(urls.map(u => fetch(u))).then(res => res.map(texts => texts.join('\n')))
}

const diff = function (time) {
  let delta = time - BASELINE
  let percent = (delta / time) * 100
  percent = Math.round(percent * 10) / 10
  return percent
}

;(async () => {
  let p = new Pool()
  let texts = await fetchAll(docs.map(file => `https://unpkg.com/nlp-corpus@3.3.0/builds/${file}`))
  console.log(`\n\n  running ${texts.length} texts on ${p.count()} workers`)
  let nums = []
  for (let i = 0; i < texts.length; i += 1) {
    console.log(`    text #${i + 1} - 🕰`)
    let num = await p.do(texts[i])
    nums.push(num)
  }
  let sum = nums.reduce((h, n) => h + n, 0)
  sum = Math.round(sum * 10) / 10
  console.log('\n\n', sum, ' total')
  console.log('  +/- ', diff(sum), '% ')
  p.close()
})()
