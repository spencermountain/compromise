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

// The public type-only subpaths must also resolve from CommonJS consumers.
import type { Lexicon, Term } from 'compromise/misc'
import type One from 'compromise/view/one'
import type { Matchable, ReplaceWithProps } from 'compromise/view/one'
import type Two from 'compromise/view/two'
import type Three from 'compromise/view/three'
import type { Nouns } from 'compromise/view/three'

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends
  (<T>() => T extends B ? 1 : 2) ? true : false
type Expect<T extends true> = T

type OneView = Expect<Equal<ReturnType<typeof one>, One>>
type TwoView = Expect<Equal<ReturnType<typeof two>, Two>>
type ThreeView = Expect<Equal<ReturnType<typeof three>, Three>>
const lexicon: Lexicon = { kermit: 'FirstName' }
const doc = nlp('Kermit walks', lexicon)
const termList = doc.termList()
const nouns = doc.nouns()
type TermsResult = Expect<Equal<typeof termList, Term[]>>
type NounsResult = Expect<Equal<typeof nouns, Nouns>>
const match: Matchable = one('walks')
const options: ReplaceWithProps = { case: true }
doc.match(match).replaceWith('runs', options)

// @ts-expect-error the public type must preserve its property types
const invalidTerm: Term = { text: 123 }

// CommonJS wrappers preserve both generic calls and namespace types.
interface CustomMethods { customText(): string }
const extended = nlp<CustomMethods>('hello')
type PluginResult = Expect<Equal<ReturnType<typeof extended.customText>, string>>
type OnePlugin = Expect<Equal<one.TypedPlugin<CustomMethods>['methods'], CustomMethods>>
type TwoPlugin = Expect<Equal<two.TypedPlugin<CustomMethods>['methods'], CustomMethods>>
type ThreePlugin = Expect<Equal<three.TypedPlugin<CustomMethods>['methods'], CustomMethods>>
