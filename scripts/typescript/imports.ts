// Compile-only consumer tests: resolve the public package exports, without paths aliases.
import nlp from 'compromise'
import tokenize from 'compromise/tokenize'
import type { Lexicon, Term } from 'compromise/misc'
import type One from 'compromise/view/one'
import type Two from 'compromise/view/two'
import type Three from 'compromise/view/three'
import one from 'compromise/one'
import two from 'compromise/two'
import three from 'compromise/three'

// Exact assertions also fail if a return type accidentally becomes `any`.
type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends
  (<T>() => T extends B ? 1 : 2) ? true : false
type Expect<T extends true> = T

const lexicon: Lexicon = { kermit: 'FirstName' }
const doc = nlp('Kermit walks to work', lexicon)
const text = doc.verbs().toPastTense().text()
const found = doc.has('#Person')
const terms = doc.termList()

type TextResult = Expect<Equal<typeof text, string>>
type HasResult = Expect<Equal<typeof found, boolean>>
type TermsResult = Expect<Equal<typeof terms, Term[]>>
type DefaultView = Expect<Equal<typeof doc, Three>>
type OneView = Expect<Equal<ReturnType<typeof one>, One>>
type TokenizeView = Expect<Equal<ReturnType<typeof tokenize>, One>>
type TwoView = Expect<Equal<ReturnType<typeof two>, Two>>
type ThreeView = Expect<Equal<ReturnType<typeof three>, Three>>

interface CustomMethods { customText(): string }
const extended = nlp<CustomMethods>('hello')
const customText = extended.customText()
type PluginResult = Expect<Equal<typeof customText, string>>
extended.verbs().toInfinitive()

// @ts-expect-error input must be text
nlp(123)
// @ts-expect-error matches cannot be numbers
doc.match(123)
// @ts-expect-error numeric transforms require numbers
doc.numbers().add('three')
// @ts-expect-error custom methods require an explicit plugin type
doc.customText()
// @ts-expect-error named selections are only available in tier three
two('hello').verbs()
// @ts-expect-error tier one has no contraction selection
one('hello').contractions()
// @ts-expect-error tokenize is the tier-one alias
tokenize('hello').nouns()
