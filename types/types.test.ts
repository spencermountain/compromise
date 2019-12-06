// a smoke-test for our typescipt typings
import nlp from '../'
import nlpNumbers from '../plugins/numbers'

nlp.extend(nlpNumbers)

const doc = nlp('hello world')
doc.numbers()
