// a smoke-test for our typescipt typings
import nlp from '../../'
import tape from 'tape'

console.log('\n 🥗  - running types-test..\n')

tape('misc functions', function(t) {
  let doc = nlp('John and Joe walked to the store')
  t.equal(doc.people().json().length, 2, 'found-people')
  t.equal(doc.verbs().json().length, 1, 'found-verbs')
  t.equal(doc.match('joe walked .').found, true, 'match-statement')
  t.equal(doc.terms(1).text('reduced'), 'and', 'text-out')
  //ensure lexicon works
  let tmp = nlp('spencer kelly', { spencer: 'Cool' })
  t.equal(tmp.match('#Cool').text(), 'spencer', 'lexicon-works')
  // let tmp = nlp.tokenize('spencer kelly', { spencer: 'Cool' })

  let obj = nlp('spencer kelly').lookup({ spencer: 'Name' })
  t.equal(obj['Name'].text(), 'spencer', 'lookup-obj')

  let m = nlp('spencer kelly').lookup(['spencer', 'david'])
  t.equal(m.text(), 'spencer', 'lookup-arr')
  t.end()
})

// Typed plugins
type testPlugin = nlp.Plugin<{ test: (text: string) => string }, { test: string }, { test: (text: string) => string }>
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
