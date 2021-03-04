// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
const reset = '\x1b[0m'
const fetch = require('./_fetch')
let nlp = require('../../../tests/_lib')
nlp.extend(require('../../../plugins/numbers/src'))
nlp.extend(require('../../../plugins/dates/src'))
const highlight = 5
const shouldFail = -10
// const fs = require('fs')

//cheaper than requiring chalk
const cli = {
  green: function (str) {
    return '\x1b[32m' + str + reset
  },
  red: function (str) {
    return '\x1b[31m' + str + reset
  },
  grey: function (str) {
    return '\x1b[90m' + str + reset
  },
}

if (!process.version.match(/^v12\./)) {
  console.warn(cli.red('Warn: Expecting node v12.x - got ' + process.version))
}

let matches = [
  'out of range',
  '#Person #Person',
  '. of the world',
  '#Noun+ house',
  'range #Noun+',
  'doubt . of #Verb',
  '(watch|house|#Verb) .',
  '(watch|house|#Verb)?',
  '(watch a film|eat a cake)+',
  '(#Noun of #Noun)+',
  '. @hasQuestionMark',
  'the .+',
  'keep a #Noun',
]

let documents = [
  ['nlp-corpus-1.json', 5.2],
  ['nlp-corpus-2.json', 5.5],
  ['nlp-corpus-3.json', 4.6],
  ['nlp-corpus-4.json', 4.6],
  ['nlp-corpus-5.json', 4.5],
  ['nlp-corpus-6.json', 4.7],
  ['nlp-corpus-7.json', 4.3],
  ['nlp-corpus-8.json', 4.5],
  ['nlp-corpus-9.json', 4.1],
  ['nlp-corpus-10.json', 4.3],
]
const round = n => Math.round(n * 100) / 100

const nice = function (n) {
  if (n > highlight) {
    n = cli.red('+' + Math.abs(n) + '%')
  } else if (n < -highlight) {
    n = cli.green('' + n + '%')
  } else {
    if (n > 0) {
      n = '+' + n
    }
    n = cli.grey(' ' + n + '%')
  }
  return n
}

console.log('\n\nrunning speed-test:\n')
;(async () => {
  let sum = 0
  // do each document
  for (let n = 0; n < documents.length; n += 1) {
    let a = documents[n]
    let texts = await fetch(`https://unpkg.com/nlp-corpus@3.3.0/builds/${a[0]}`)
    const _nlp = nlp.clone()
    //start testing the speed
    let begin = new Date()
    texts.forEach(txt => {
      let doc = _nlp(txt)
      matches.forEach(reg => {
        doc.match(reg).text()
      })
      // let m = doc
      //   .filter(s => {
      //     return s.dates().found
      //   })
      //   .json()
      // let rows = m.map(obj => obj.text).join('\n')
      // fs.writeFileSync('./dates.txt', rows, { flag: 'a' })
    })
    texts.forEach(txt => {
      let doc = _nlp(txt)
      doc.json()
    })
    let end = new Date()
    // calculate diff
    let time = (end.getTime() - begin.getTime()) / 1000
    // console.log('\n ' + n + 'ms  ' + time, a[1])
    let diff = round(time - a[1])
    let percent = round((diff / time) * 100, 10)
    sum += percent
    console.log(`${a[0]}:   ${nice(percent)}`)
  }
  let avg = round(sum / documents.length)
  console.log(`\n ${nice(avg)} avg difference\n`)

  // if it's a bad difference, fail
  if (avg < shouldFail) {
    process.exit(1)
  }
})()
