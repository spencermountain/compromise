// a smoke-test for our typescipt typings
import nlp from '../'
import nlpNumbers from '../plugins/numbers'

type CustomWorld = nlp.World & { a: string }
type CustomDoc = nlp.Document<CustomWorld> & { numbers: () => void }

const nlp2 = nlp.extend<CustomDoc>(nlpNumbers)

const doc = nlp<CustomDoc>('hello world')
doc.numbers()
type a = typeof doc.world.a

const doc2 = nlp2('hello world')
doc2.numbers()
type a2 = typeof doc2.world.a
