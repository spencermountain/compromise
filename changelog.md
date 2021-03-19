compromise uses semver, and pushes to npm frequently

(github-releases occasionally)

- **Major** is a breaking api change - method or response changes that can cause runtime errors.
- **Minor** is a behaviour change - Tagging or grammar changes.
- **Patch** is an obvious, non-controversial bugfix.

While all _Major_ releases should be reviewed, our only two _large_ releases are **v6** in 2016 and and **v12** in 2019. Others have been mostly incremental, or niche.

<!-- #### [Unreleased] 
-->
#### 13.10.4  [March 2021]
- **[fix]** - match syntax tokenization fix
- **[change]** - improved performance monitoring
  
#### 13.10.3  [March 2021]
- **[fix]** - support complicated regular-expressions in match syntax
- improved performance testing
  
#### 13.10.2  [March 2021]
- **[fix]** - support matching implicit terms in (or|blocks)
- **[change]** - add #Timezone tag (from date-plugin)
- **[change]** - add many more cities and regions

#### 13.10.1 [March 2021]
- **[change]** - #Date terms can still be a #Conjunction
- **[new]** - #Imperative tag and `.verbs().isImperative()` method
- **[fix]** - some tagger issues
- update deps
*plugin-releases*:  dates


#### 13.10.0 [Feb 2021]
- **[new]** - #Fraction tag and improved fraction support (thanks Jakeii!)
- **[fix]** - edge-case match issues with `!` syntax
- **[change]** - update deps
- updates for `compromise-dates@1.4.0`, `compromise-numbers@1.2.0`

#### 13.9.3 [Feb 2021]
- **[fix]** - fix weird ordering issue with named exports #815
  
#### 13.9.2 [Feb 2021]
- **[fix]** - typescript issue
  
#### 13.9.1 [Feb 2021]
- **[fix]** - matches over a contraction 
- **[new]** - add 'implicit' text output

#### 13.9.0 [Feb 2021]
- **[new]** - World.addConjugations() method
- **[new]** - World.addPlurals() method
- **[new]** - start compromise-penn-tags plugin
- **[new]** - add fuzzy option to match commands
- **[new]** - support multiple-word matches in OR matches (a|b|foo bar|c)
- **[change] (internal)** - rename 'oneOf' match syntax to 'fastOr' 
- **[change]** - use new export maps format
- **[fix]** - conjugations fixes #800
- **[fix]** - tokenization fixes #801

#### 13.8.0 [Dec 2020]
- **[change]** improved support for fractions in numbers-plugin #793
- **[change]** remove zero-width characters in normalized output #759
- **[change]** improved Person tagging with particles #794
- **[change]** improved i18n Person names
- **[change]** tagger+tokenization fixes
- **[change]** remove empty results from .out('array') #795
- **[change]** `.tokenize()` runs any postProcess() scripts from plugins
- **[change]** improved support for lowercase acronyms
- **[change]** - support years like '97
- **[change]** - change tokenizer for '20-aug'
- **[change]** - update deps of all plugins
- **[fix]** - NumberRange tagging issue #795
- **[fix]** - improved support for ordinal number ranges
- **[fix]** - improved regex support in match-syntax
- **[fix]** - improved support for ~soft~ match syntax #797
- **[fix]** - better handling of `{0,n}` match syntax
- **[new]** - new plugin `strict-match`
- **[new]** - set NounPhrase, VerbPhrase tags in nlp-sentences plugin
- **[new]** - `.phrases()` method in nlp-sentences plugin
- **[new]** - support `.apppend(doc)` and `.prepend(doc)`
- **[new]** - `values.normalize()` method


#### 13.7.0 [Oct 2020]
- **[change]** many misc tagging fixes
  - 'if' is now a #Preposition
  - possessive pronouns are #Pronoun and #Possessive
  - more phrasal verbs
  - make #Participle tag #PastTense
  - favor #PastTense over #Participle interpretation in tagger
- **[change]** `@hasHyphen` returns false for sentence dashes
- a lot more testing

#### 13.6.0 [Oct 2020]

- **[new]** first-attempt at `verbs().subject()` method
- **[change]** avoid conjugating imperative tense - 'please close the door'
- **[change]** misc tagging fixes #786
- **[change]** .nouns() results split on quotations #783
- **[change]** NumberRange must be < 4 digits #735
- **[change]** reduction in #Person tag false-positives

#### 13.5.0 [Sep 2020]

- **[new]** add `.parseMatch()` method for pre-parsing match statements

#### 13.4.0 [Sep 2020]

- **[change]** stop including adverbs and some auxiliaries in `.conjugate()` results
- **[change]** .append() and .prepend() on an empty doc now creates a new doc
- **[new]** add `verbs().toParticiple()` method (add to observables/verb)
- **[new]** add `sentences().toParticiple()` method (add to observables/verb)
- **[fix]** some verb-tagging issues
- **[fix]** contractions issue in `.clone()`
- **[fix]** try harder to retain modal-verbs in conjugation - 'i should drive' no-longer becomes 'i will drive'

#### 13.3.2 [Aug 2020]

- fix for offset issue #771
- fix for `{min,max}` syntax #767
- typescript fixes
- update deps

#### 13.3.1 [June 2020]

-support unicode spaces for #759

- major improvements to `compromise-plugin-dates` (1.0.0)

#### 13.3.0 [June 2020]

- bugfixes (conjugation and tagging) 752, 737, 725, 751, 743 748, 755, 758, 706, 761
- support tokenized array as input
- update deps
- bugfix updates to `plugin-sentences`, and `plugin-dates`

#### 13.2.0 [May 2020]

- deprecate `.money()` and favour overloaded method in compromise-numbers plugin
- add `.percentages()` and `.fractions()` to compromise-numbers plugin
- add `.hasAfter()` and `.hasBefore()` methods
- change handling of slashes
- add `.world()` method to constructor
- add more abbreviations
- fix regex backtracking #739
- tokenize build:
- - remove conjugation and inflection data
- - remove conjugation and inflection functions
- remove sourcemap from build process (too big)
- improvements to `.numbers().units()`
- fix for linked-list runtime error #744 with contractions

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

### 13.0.0 [Feb 2020]

_major changes to `.export()` and `[capture] group` match-syntax._

- **[breaking]** move .export() and .load() methods to plugin (compromise-export)
- - change .export() format - this hasn't worked properly since v12. (mis-parsed contractions) see #669
- **[breaking]** split `compromise-output` into `compromise-html` and `compromise-hash` plugins
- **[breaking]** `.match('foo [bar]')` no-longer returns 'bar'. (use `.match('foo [bar]', 0)`)
- **[breaking]** capture groups are no longer merged. `.match('[foo] [bar]')` returns two groups accessible with the new `.groups()` function
- **[breaking]** change `.sentences()` method to return only full-sentences of matches (use `.all()` instead)

modifications:

- **[fix]** -  nlp.clone() - hasn't worked properly, since v12. (@Drache93)
- **[fix]** -  issues with greedy capture [*] and [.+] -(@Drache93) 💛
- add whitespace properties (pre+post) to default json output (suppress with `.json({ whitespace: false })`)
- `.lookup({ key: val })` with an object now returns an object back ({val: Doc})
- add nlp constructor as a third param to `.extend()`
- support lexicon object param in tokenize - `.tokenize('my word', { word: 'tag' })`
- clean-up of scripts and tooling
- improved typescript types
- add support for some french contractions like `j'aime -> je aime`
- allow null results in `.map()` function
- better typescript support
- allow longer acronyms
- **[fix]** -  offset length issue
- **[new]** -  add new named-match syntax, with .groups() method (@Drache93)
- **[new]** -  add `nlp.fromJSON()` method
- **[new]** -  add a new `compromise-tokenize.js` build, without the tagger, or data included.

#### 12.3.0 [Jan 2020]

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

##### 12.2.1 [Dec 2019]

- fix 'aint' contraction
- make Doc.world writable
- update deps
- more tests
- fix shared period with acronym at end of sentence
- fix some mis-classification of contraction
- fix over-active emoji regex
- tag 'cookin', 'hootin' as `Gerund`
- support unicode single-quote symbols in contractions

#### 12.2.0 [Dec 2019]

- improved splitting in .nouns()
- add `.nouns().adjectives()` method
- add `concat` param to `.pre()` and `.post()`
- allow ellipses at start of term _"....so"_ in `@hasEllipses`
- fix matches with optional-end `foo?$` match syntax
- add typescript types for subsets

#### 12.1.0 [Nov 2019]

- add 'sideEffect:false' flag to build
- considerable speedup (20%) in tagger
- ensure trimming of whitespace for root/clean/reduced text formats
- fix client-side logging
- more flexible params to `replace()` and `replaceWith()`

### 12.0.0 &nbsp; :postal_horn: [Nov 2019]

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
