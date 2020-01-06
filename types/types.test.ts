// a smoke-test for our typescipt typings
import nlp from '../'
import nlpNumbers from '../plugins/numbers'

type CustomWorld = nlp.World & { a: string }
type CustomWorld2 = nlp.World & { b: number }
type CustomDoc = { numbers: () => void }
type CustomDoc2 = { test: (a: string) => void }

const nlp2 = nlp.extend<CustomDoc, CustomWorld>(nlpNumbers)

const doc = nlp<CustomDoc, CustomWorld>('hello world')
doc.numbers()
type a = typeof doc.world.a

const doc2 = nlp2('hello world')
doc2.numbers()
type a2 = typeof doc2.world.a

const nlp3 = nlp2.extend<CustomDoc2, CustomWorld2>(nlpNumbers)
const doc3 = nlp3('hello world')
doc3.test('test')
doc3.numbers()
type a3 = typeof doc3.world.a
type b = typeof doc3.world.b
