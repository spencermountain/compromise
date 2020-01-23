// a smoke-test for our typescipt typings
import nlp from '../../types'

// Typed plugins
type testPlugin = nlp.Plugin<{ test: (text: string) => string }, { test: string }>
const test: testPlugin = (Doc, world, nlp, Phrase, Term, Pool) => {
  // Prototype is visible in here with plugin values
  Doc.prototype.test = text => text
  world.test = 'Hello world!'

  world.addTags({
    Character: {
      isA: 'Person',
      notA: 'Adjective',
    },
    Dog: {
      isA: ['Animal'],
      notA: ['Fish', 'Reptile'],
    },
  })

  world.addWords({
    kermit: 'Character',
    gonzo: 'Character',
  })

  world.postProcess(doc => {
    doc.match('light the lights').tag('#Verb . #Plural')
    world.test = doc.test('boom!')
  })

  Term.prototype.test = (text: string) => text
  Phrase.prototype.test = (text: string) => text
  Pool.prototype.test = (text: string) => text
}

class Numbers {
  json() {
    return {}
  }
}

type numbersPlugin = nlp.Plugin<{ numbers: (n?: number) => Numbers }, {}>
const numbers: numbersPlugin = Doc => {
  // Prototype is visible in here with plugin values
  Doc.prototype.numbers = () => new Numbers()
}

const nlpEx = nlp.extend(numbers).extend(test)

const doc = nlpEx('hello world') // This type is cleaner
doc.nouns()
doc.nouns().world.test
doc.test('test')
doc.numbers()
doc.numbers().json()
doc.world.test === typeof 'string'

// Demo: For external use
export type NLP = typeof nlpEx

// Standard still works
const docSimple = nlp('test')
docSimple.nouns()
docSimple.nouns().world
nlp.tokenize('test')
nlp.version

// Directly set nlp type
const doc2 = nlp<
  {
    numbers: () => number[]
  },
  {
    a: string
  }
>('test')
doc2.numbers()
doc2.world.a === typeof 'string'

/** Instance test */
const pluginTest: nlp.Plugin<{}, { test: 'test' }> = (_, world) => {
  world.test = 'test'
}

const nlpEx2 = nlp.extend(pluginTest)

nlpEx2().world.test === 'test'
nlpEx2.clone()().world.test === 'test'
