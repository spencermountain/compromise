// Exercise the separate CommonJS declaration entry points.
import nlp = require('compromise')
import one = require('compromise/one')
import tokenize = require('compromise/tokenize')
import two = require('compromise/two')
import three = require('compromise/three')

const text: string = nlp('she walks').verbs().toPastTense().text()
const terms: string = one('hello world').terms().text()
const tokens: string = tokenize('hello world').text()
const expanded: string = two("she's walking").contractions().expand().text()
const plural: string = three('cat').nouns().toPlural().text()

// @ts-expect-error CommonJS imports must preserve argument types
nlp(123)
// @ts-expect-error tier two has no named verb selection
two('hello').verbs()
// @ts-expect-error tier one has no contraction selection
one('hello').contractions()
// @ts-expect-error tokenize is the tier-one alias
tokenize('hello').nouns()
// @ts-expect-error numeric transforms require numbers
three('three').numbers().add('three')
