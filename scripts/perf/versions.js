/* eslint-disable no-console */
import fetch from './_fetch'

const versions = [
  // '13.0.0',// feb 2020
  // '13.1.0',
  // '13.1.1',
  // '13.2.0',
  // '13.3.0',
  // '13.3.1',
  // '13.3.2',
  // '13.4.0',
  // '13.5.0',
  // '13.6.0',
  // '13.7.0',
  // '13.8.0',
  // '13.9.0',
  // '13.9.1',
  // '13.9.2',
  // '13.9.3',
  // '13.10.0',
  '13.10.1',
  '13.10.2',
]

const matches = [
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
const nlps = versions.map(version => {
  return require('compromise' + version)
})
nlps.push(require('../../types'))

const testOne = function (nlp, texts) {
  const begin = new Date()
  texts.forEach(txt => {
    const doc = nlp(txt)
    matches.forEach(reg => {
      doc.match(reg).text()
      doc.json()
    })
  })
  const end = new Date()
  return (end.getTime() - begin.getTime()) / 1000
}

;(async () => {
  const texts = []
  for (let i = 1; i < 5; i += 1) {
    const text = await fetch(`https://unpkg.com/nlp-corpus@3.3.0/builds/nlp-corpus-${i}.json`)
    texts.push(text.join('\n'))
  }

  console.log(`\n\n\n === got ${texts.length} texts, and ${nlps.length} versions\n`)
  for (let i = 0; i < nlps.length; i += 1) {
    console.log('\n' + nlps[i].version + ':')
    const time = testOne(nlps[i], texts)
    console.log(`         ${time}s`)
  }
})()
