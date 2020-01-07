// a smoke-test for our typescipt typings
import nlp from '../'
import nlpNumbers from '../plugins/numbers'

// Typings for imported plugin
type NLPNumbers = nlp.Plugin<
  {
    numbers: () => number[]
  },
  {
    a: string
  }
>

// vs Typed plugin
type NLPTest = nlp.Plugin<{ test: (text: string) => string }, { test: string }>
const test: NLPTest = (Doc, world) => {
  Doc.test = text => text
  world.test = 'Hello world!'
}

const nlpEx = nlp
  // Give typing to untyped Plugin
  .extend(nlpNumbers as NLPNumbers)
  // Use typed plugin
  .extend(test)

const doc = nlpEx('hello world')
doc.test('test')
doc.numbers()
type a3 = typeof doc.world.a
type b = typeof doc.world.test

// Demo: For external use
export type NLP = typeof nlpEx

// Standard still works
nlp('test')
nlp.tokenize('test')
nlp.version
