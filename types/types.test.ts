// a smoke-test for our typescipt typings
import nlp from '../'
// @ts-ignore
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
  // Prototype is visible in here with plugin values
  Doc.prototype.test = text => text
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
doc.world.a === typeof 'string'
doc.world.test === typeof 'string'

// Demo: For external use
export type NLP = typeof nlpEx

// Standard still works
nlp('test')
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
