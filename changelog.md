compromise uses semver, and pushes to npm frequently

(github-releases occasionally)

- **Major** is a breaking api change - method or response changes that can cause runtime errors.
- **Minor** is a behaviour change - Tagging or grammar changes.
- **Patch** is an obvious, non-controversial bugfix.

While all _Major_ releases should be reviewed, our only two _large_ releases are **v6** in 2016 and and **v12** in 2019. Others have been mostly incremental, or niche.

#### 13.1.1

- fix `verbs.json()` runtime-error
- improve empty `.lists()` methods
- allow custom tag colors
- test new github action workflow

#### 13.1.0

- significant (~30%) speed up of parsing
- change sensitivity of input in `.lookup()` for major speed improvements.
- improved typescript types
- subtle changes to internal caching
- adds 'oneOf' match syntax param
- fixes `[word?]` syntax parsing

### 13.0.0

_major changes to `.export()` and `[capture] group` match-syntax._

- **[breaking]** move .export() and .load() methods to plugin (compromise-export)
- - change .export() format - this hasn't worked properly since v12. (mis-parsed contractions) see #669
- **[breaking]** split `compromise-output` into `compromise-html` and `compromise-hash` plugins
- **[breaking]** `.match('foo [bar]')` no-longer returns 'bar'. (use `.match('foo [bar]', 0)`)
- **[breaking]** capture groups are no longer merged. `.match('[foo] [bar]')` returns two groups accessible with the new `.groups()` function
- **[breaking]** change `.sentences()` method to return only full-sentences of matches (use `.all()` instead)

modifications:

- fix nlp.clone() - hasn't worked properly, since v12. (@Drache93)
- fix issues with greedy capture [*] and [.+] -(@Drache93) 💛
- add whitespace properties (pre+post) to default json output (suppress with `.json({ whitespace: false })`)
- `.lookup({ key: val })` with an object now returns an object back ({val: Doc})
- add nlp constructor as a third param to `.extend()`
- support lexicon object param in tokenize - `.tokenize('my word', { word: 'tag' })`
- clean-up of scripts and tooling
- improved typescript types
- add support for some french contractions like `j'aime -> je aime`
- allow null results in `.map()` function

new things:

- add new named-match syntax, with .groups() method (@Drache93)
- add `nlp.fromJSON()` method
- add a new `compromise-tokenize.js` build, without the tagger, or data included.

#### 12.4.0

- adds proper `nlp.clone()` support (thanks @Drache93!)
- better typescript support
- allow longer acronyms
- fix offset length issue

#### 12.3.0

- prefer `@titleCase` instead of `#TitleCase` tag
- update dependencies
- fix case-sensitive paths
- fix greedy-start match condition regression #651
- fix single period sentence runtime error
- fix potentially-unsafe regexes
- improved tagging for '-ed' verbs (#616)
- improve support for auxilary-pastTense ('was lifted') verb-phrases
- more robust number-tagging regexes
- setup typescript types for plugins #661 (thanks @Drache93!)
- verb conjugation and tagger bugfixes
- disambiguate between acronyms & yelling

##### 12.2.1

- fix 'aint' contraction
- make Doc.world writable
- update deps
- more tests
- fix shared period with acronym at end of sentence
- fix some mis-classification of contraction
- fix over-active emoji regex
- tag 'cookin', 'hootin' as `Gerund`
- support unicode single-quote symbols in contractions

#### 12.2.0

- improved splitting in .nouns()
- add `.nouns().adjectives()` method
- add `concat` param to `.pre()` and `.post()`
- allow ellipses at start of term _"....so"_ in `@hasEllipses`
- fix matches with optional-end `foo?$` match syntax
- add typescript types for subsets

#### 12.1.0

- add 'sideEffect:false' flag to build
- considerable speedup (20%) in tagger
- ensure trimming of whitespace for root/clean/reduced text formats
- fix client-side logging
- more flexible params to `replace()` and `replaceWith()`

### 12.0.0 &nbsp; :postal_horn:

- see **[Release Notes](https://github.com/spencermountain/compromise/wiki/v12-Release-Notes)**

#### 11.13.0

- support singular units in `.value()`

#### 11.11.0

- `.quotations()` no-longer return repeated results for nested quotes
- simplify quotation tagset
- `.out('normal')` no longer includes quotes or trailing-possessives
- improve `.debug()` on client-side

#### 11.10.0

- better honorific support, add `honorifics` feature to .normalize()
- elipses bugfixes
- replace unicode chars in `.normalize()` now by default
- `acronyms().stripPeriods()` and `acronyms().addPeriods()`

#### 11.9.0

- tag professions as `#Actor`
- add more behaviours to `.normalize()`
- support match-results as inputs to .match() and .not()
- support some us-state abbreviations like 'Phoeniz AZ'

#### 11.8.0

- add `nouns().toPossessive()`
- ngrams now remove empty-terms in contractions - fixes counting issue [#476](https://github.com/spencermountain/compromise/issues/476)

#### 11.7.0

- expose internal `sentences().isQuestion()` method
- `.join()` as an alias for `.flatten()`
- slightly different behavior for wildcards in capture-groups [pull/472](https://github.com/spencermountain/compromise/pull/472)
- `.possessives()` subset + `#Possessive` tagging fixes
- hide massive `world` output for console.log of a term

#### 11.6.0

- improve quotations() method
- add .parentheses() method
- add 'nickname' support to .people()
- 'will be #Adjective' now tagged as Copula
- include adverbs in verb conjugation (more) consistently
- `sentences().toContinuous()` and `verbs().toGerund()`
- some more aliases for jquery-like methods api
- move `getPunctuation`, `setPunctuation` from .sentence to main Text method
- rename internal `endPunctuation` to `getPunctuation`
- more consistent `cardinal/ordinal` tagging for values

#### 11.5.0

- add #Abbreviation tag
- add #ProperNoun tag
- fixes for noun inflection

##### 11.4.1

- include old ending punctuation in a `.replace()` cmd

##### 11.3.1

- almost-double the support for first-names
- changes to bestTag method

##### 11.2.1

- rolls-back some aggressive JustesonKatz stuff
- better support for emdash numberRange
- 'can\'t' contraction bugfix
- fix for dates().toShortForm()

#### 11.1.0

- add `#Multiple` Values tag, and changes to how invalid numbers like 'sixty fifteen hundred' are understood
- better em-dash/en-dash support
- better conjugate implicit verbs inside contractions - "i'm", "we've"
- nouns().articles() method
- neighborhoods as #Place
- support more complex noun-phrases with JustesonKatz in `.nouns()`

### v11

- support for persistent lexicon/tagset changes
- `addTags, addWords, addRegs, addPlurals, addConjugations` methods to extend native data
- - `.plugin()` method to wrap all of these into one
- - (removal of `.packWords()` method)
- more `.organizations()` matches
- regex-support in .match() - `nlp('it is waaaay cool').match('/aaa/').out()//'waaaay'`
- improved apostrophe-s disambiguation
- support whitespace before sentence boundary
- improved QuestionWord tagging, some `.questions()` without a question-mark
- phrasalVerb conjugation
- new #Activity tag for Gerunds as nouns 'walking is fun'
- change ngram params to an object `{size:int, max:int}`
- implement '[]' capture-group syntax in .match()
- bring-back `map, filter, foreach and reduce` methods
- set `.words()` as alias for .terms()
- `people().firstNames()`, `people().lastNames()`
- split-out comma-separated adverbs

##### 10.7.2

- fix for '.watch' reserved word in efrt

#### 10.7.0

- improved `places()` parsing
- improved `{min,max}` match syntax
- new `.out('match')` method
- quiet addition of .pack() and .unpack() for owen

#### 10.6.0

- move internal lexicon around, to support new format in v11
- added states & provinces as #Region
- added #Comparable tag for adjectives that conjugate

#### 10.5.0

- add increment/decrement/add/subtract methods to .values()
- add units(), noUnits() methods to .values()
- 'uncountable' nouns are no longer assumed to be singular
- money tag is no longer always a value

#### 10.4.0

- improved tagging of `VerbPhrase` and `Condition`
- fixes to contractions in sentence-changes - "i'm going -> i went"
- several verb conjugation fixes
- accept Terms & Result objects in .match() and .replace()

#### 10.3.0

- new `Percent` tag
- lump more units in with `.values()`

#### 10.2.0

- .trim() method,
- adjective tagging fixes
- some new .out() methods

#### 10.1.0

- fix return format of .isPlural(), so it acts like a match filter
- less-greedy date tagging & ambiguous month fixes

### v10

- cleanup & rename some `.value()` methods
- change lumping behaviour of lexicon terms with multiple words
- keep more former tags after a term replace method
- new `.random()` method
- new `.lessThan()`, `.greaterThan()`, `.equalTo()` methods
- new prefix/suffix/infix matches with `_ffix` syntax
- `tag()` supports a sequence of tags for a sequence of terms
- .match 'range' queries now use a real match - `#Adverb{2,4}`
- new `.before()` and `.after()` match methods
- removes `.lexicon()` method for many-lexicons concept
- changes params of `.replaceWith()` method to a 'keyTags' boolean
- improved .debug() and logging on client-side

#### 9.1.0

- pretty-real filesize reduction by swapping es6 classes for es5 inheritance

### v9.0.0

- rename `Term.tag` object to `Term.tags` so the `.tag()` method can work throughout more-consistently
- fix 'Auxillary' tag typo to 'Auxiliary'
- optimisation of .match(), and tagset - significant speedup!
- adds `.tagger()` method and cleanup extra params
- adds `wordStart` and `wordEnd` offsets to `.out('offset')` for whitespace+punctuation
- new `.has()` method for faster lookups

#### 8.2.0

- add `nlp.out('index')` method, 12 bugs

#### 8.1.0

- add `nlp.tokenize()` method for disabling pos-tagging of input

### v8.0.0

- less-ambitious date-parsing of nl-date forms
- filesize reduction using [efrt](https://github.com/nlp-compromise/efrt) data structure (254k -> 214k)

##### 7.0.15

- fix for IE9

### v7 &nbsp; :postal_horn:

- weee! [big change!](https://github.com/nlp-compromise/compromise/wiki/v7-Upgrade,-welcome) _npm package rename_

#### 6.5.0

- builds now using browserify + derequire()

#### 6.4.0

- re-written term-lumper logic

#### 6.3.0

- new nlp.lexicon({word:'POS'}) flow

### v6

- be consistent with `text.normal()`, `term.all_forms()`, `text.word_count()`. `text.normal()` includes sentence-terminators, like periods etc.

#### 5.2.0

- airport codes support, helper methods for specific POS

#### 5.1.0

- newlines split sentences

### v5

- Text methods now return this, instead of array of sentences

#### 4.12.0

- more-sensible responses for invalid, non-string inputs

#### 4.11.0

- 14 PRs, with fixes for currencies, pluralization, conjugation

#### 4.10.0

- Value.to_text() new method, fix "Posessive" POS typo

#### 4.9.0

- return of the text.spot() method (Re:#107)

#### 4.8.0

- more aggressive lumping of dates, like 'last week of february'

#### 4.7.0

- whitespace reproduction in .text() methods

#### 4.6.0

- move negate from sentence to verb & statement

#### 4.2.0

- rename 'implicit' to 'expansion' for smarter contractions

##### 4.1.3

- added readable-compression to adj, verbs (121kb -> 117kb)

#### 4.1.0

- hyphenated words are normalized into spaces

### v4.0.0

- grammar-aware match & replace functions

##### 3.0.2

- Statement & Question classes

### v3.0.0 Feb 2016

- split ngram, locale, and syllables into plugins in seperate repo

### 2.0.0 - Nov 2015

- es6 classes, babel building
- better test coverage
- ngram uses term tokenization, so that 'Tony Hawk' us one term, and not two
- more organized pos rules
- Pos tagging is done implicitly now once nlp.Text is run
- Entity spotting is split into .people(), .place(), .organisations()
- unicode normalisation is killed
- opaque two-letter tags are gone
- plugin support
- passive tense detection
- lexicon can be augmented third-party
- date parsing results are different

##### 1.1.0 - May 2015

- smarter handling of ambiguous contractions ("he's" -> ["he is", "he has"])

### v1.0.0 - May 2015

- added name genders and beginning of co-reference resolution ('Tony' -> 'he') API.
- small breaking change on `Noun.is_plural` and `Noun.is_entity`, affording significant pos() speedup. Bumped Major version for these changes.

##### 0.5.2 - May 2015

- Phrasal verbs ('step up'), firstnames and .people()

##### 0.4.0 - May 2015

- Major file-size reduction through refactoring

##### 0.3.0 - Jan 2015

- New NER choosing algorithm, better capitalisation logic, consolidated tests

##### 0.2.0 - Nov 2014

- Sentence class methods, client-side demos
