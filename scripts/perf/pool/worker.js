const { parentPort } = require('worker_threads')
// const nlp = require('../../src')
let nlp = require('./_lib')

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

const doit = async function (txt) {
  let doc = nlp(txt)
  matches.forEach(reg => {
    doc.match(reg).text()
  })
  doc.json()
}

parentPort.on('message', async msg => {
  let begin = new Date()
  doit(msg)
  let end = new Date()
  let delta = (end.getTime() - begin.getTime()) / 1000
  parentPort.postMessage(delta)
})

// new Promise(async resolve => {
//   parentPort.postMessage(r)
//   resolve(r)
// })
