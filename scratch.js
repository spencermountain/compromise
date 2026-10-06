import fs from 'node:fs'
import nlp from './src/two.js'
// const book = fs.readFileSync(new URL('./scripts/bench/infinite-jest.txt', import.meta.url), 'utf8')

// lexicon:        512ms
// preTagger:      968ms
// contractionTwo: 155ms
// left-right:     104ms
// main-sweep:    2731ms
// second-sweep:   696ms

// const doc = nlp('dude we should').debug()
// const doc = nlp('the poor eat rice').debug()

nlp.verbose(true)
const doc = nlp('The red boat. The very red boat.')
const pattern = '#Determiner #Adjective #Noun'
doc.match('#Determiner #Adverb? #Adjective #Noun').debug()

// Common short names resolve to canonical POS tags.
nlp.verbose(false)
console.log(nlp('the red boat').match('#DT #JJ #NN').text())
console.log(nlp.tokenize('painted').tag('VBN').has('#Participle'))
console.log(nlp.tokenize('out').tag('Particle').has('#Particle'))

// Localized names can coexist with the built-in aliases.
nlp.addTags({
  Noun: { aliases: [...nlp.world().model.one.tagSet.Noun.aliases, 'Nomen', 'Substantiv'] }
})
const german = nlp.tokenize('das Haus')
german.match('Haus').tag('#Nomen')
console.log(german.match('das #Nomen').text())
console.log(german.match('#NN').text())

// The first alias controls spec output; null keeps the canonical name.
nlp.addTags({ Determiner: { aliases: ['Det', 'DT'] } })
const article = nlp.tokenize('the').tag('DT')
console.log(article.out('spec')) // the {Det}
nlp.addTags({ Determiner: { aliases: [null, 'Det', 'DT'] } })
console.log(article.out('spec')) // the {Determiner}
console.log(article.has('#Det')) // true
