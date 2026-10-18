/* eslint-disable no-console */
import nlp from './src/three.js'

const section = name => console.log(`\n── ${name} ──\n`)

section('hooks: spec snapshots after each stage')
nlp.verbose('hooks')
nlp("She won't work your magic.")

section('tagger: changes grouped by rule')
nlp.verbose('tagger')
nlp('work your magic')

section('tagger: focus on one word')
nlp.verbose('tagger', { word: 'work' })
nlp('work your magic')

section('contractions: expansions, possessives, and revisions')
nlp.verbose('contractions')
nlp("She's walking. John's car won't start. I wanna pickle.")

section('match: successful and unsuccessful patterns')
// Parse quietly so only our explicit matches are logged.
nlp.verbose(false)
const doc = nlp('The red boat sailed away.')
nlp.verbose('match')
doc.match('#Determiner #Adjective #Noun')
doc.match('#Noun #Adjective')

section('true: all traces nested inside their hooks')
nlp.verbose(true) // nlp.verbose() does the same thing
nlp("She won't work your magic.")

section('false: tracing disabled')
nlp.verbose(false)
console.log(nlp('work your magic').text())
