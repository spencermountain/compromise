import { parentPort } from 'worker_threads'
// const nlp = require('../../src')
import nlp from './_lib.js'
// import plg from '../../../plugins/dates/src/plugin.js'
// nlp.plugin(plg)


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
  // doc.compute('root')
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
