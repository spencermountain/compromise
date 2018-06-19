compromise uses semver, and pushes to npm frequently

(github-releases occasionally)

* **Major** is considered a breaking api change,
* **Minor** is considered a behaviour/performance change.
* **Patch** is an obvious, non-controversial bugfix

### v11
##### 11.11.0
- `.quotations()` no-longer return repeated results for nested quotes
- simplify quotation tagset
- `.out('normal')` no longer includes quotes or trailing-possessives
- improve `.debug()` on client-side
##### 11.10.0
- better honorific support, add `honorifics` feature to .normalize()
- elipses bugfixes
- replace unicode chars in `.normalize()` now by default
- `acronyms().stripPeriods()` and `acronyms().addPeriods()`
##### 11.9.0
- tag professions as `#Actor`
- add more behaviours to `.normalize()`
- support match-results as inputs to .match() and .not()
- support some us-state abbreviations like 'Phoeniz AZ'
##### 11.8.0
- add `nouns().toPossessive()`
- ngrams now remove empty-terms in contractions - fixes counting issue [#476](https://github.com/spencermountain/compromise/issues/476)
##### 11.7.0
- expose internal `sentences().isQuestion()` method
- `.join()` as an alias for `.flatten()`
- slightly different behavior for wildcards in capture-groups [pull/472](https://github.com/spencermountain/compromise/pull/472)
- `.possessives()` subset + `#Possessive` tagging fixes
- hide massive `world` output for console.log of a term
##### 11.6.0
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

##### 11.5.0
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
##### 11.1.0
- add `#Multiple` Values tag, and changes to how invalid numbers like 'sixty fifteen hundred' are understood
- better em-dash/en-dash support
- better conjugate implicit verbs inside contractions - "i'm", "we've"
- nouns().articles() method
- neighborhoods as #Place
- support more complex noun-phrases with JustesonKatz in `.nouns()`
<!-- * include 'the #TitleCase' matches in .topics() -->

##### 11.0.0
- support for persistent lexicon/tagset changes
- `addTags, addWords, addRegs, addPlurals, addConjugations` methods to extend native data
- - `.plugin()` method to wrap all of these into one
- - (removal of `.packWords()` method)
- more `.organizations()` matches
- regex-support in .match() -   `nlp('it is waaaay cool').match('/aaa/').out()//'waaaay'`
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

### v10
##### 10.7.2
- fix for '.watch' reserved word in efrt
##### 10.7.0
- improved `places()` parsing
- improved `{min,max}` match syntax
- new `.out('match')` method
- quiet addition of .pack() and .unpack() for owen
##### 10.6.0
- move internal lexicon around, to support new format in v11
- added states & provinces as #Region
- added #Comparable tag for adjectives that conjugate
##### 10.5.0
- add increment/decrement/add/subtract methods to .values()
- add units(), noUnits() methods to .values()
- 'uncountable' nouns are no longer assumed to be singular
- money tag is no longer always a value
##### 10.4.0
- improved tagging of `VerbPhrase` and `Condition`
- fixes to contractions in sentence-changes - "i'm going ->  i went"
- several verb conjugation fixes
- accept Terms & Result objects in .match() and .replace()
##### 10.3.0
- new `Percent` tag
- lump more units in with `.values()`
##### 10.2.0
- .trim() method,
- adjective tagging fixes
- some new .out() methods
##### 10.1.0
- fix return format of .isPlural(), so it acts like a match filter
- less-greedy date tagging & ambiguous month fixes
##### 10.0.0
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

### v9  &nbsp;
##### 9.1.0
- pretty-real filesize reduction by swapping es6 classes for es5 inheritance
##### 9.0.0
- rename `Term.tag` object to `Term.tags` so the `.tag()` method can work throughout more-consistently
- fix 'Auxillary' tag typo to 'Auxiliary'
- optimisation of .match(), and tagset - significant speedup!
- adds `.tagger()` method and cleanup extra params
- adds `wordStart` and `wordEnd` offsets to `.out('offset')` for whitespace+punctuation
- new `.has()` method for faster lookups

### v8  &nbsp;
##### 8.2.0
- add `nlp.out('index')` method, 12 bugs
##### 8.1.0
- add `nlp.tokenize()` method for disabling pos-tagging of input
##### 8.0.0
- less-ambitious date-parsing of nl-date forms
- filesize reduction using [efrt](https://github.com/nlp-compromise/efrt) data structure (254k -> 214k)

### v7  &nbsp; :postal_horn:
##### 7.0.15
- fix for IE9
##### 7.0.0
- weee! [big change!](https://github.com/nlp-compromise/compromise/wiki/v7-Upgrade,-welcome) *npm package rename*

### v6  &nbsp;  
##### 6.5.0
- builds now using browserify + derequire()
##### 6.4.0
- re-written term-lumper logic
##### 6.3.0
- new nlp.lexicon({word:'POS'}) flow
##### 6.0.0
- be consistent with `text.normal()`, `term.all_forms()`, `text.word_count()`. `text.normal()` includes sentence-terminators, like periods etc.

### v5  &nbsp;  
##### 5.2.0
- airport codes support, helper methods for specific POS
##### 5.1.0
- newlines split sentences
##### 5.0.0
- Text methods now return this, instead of array of sentences

### v4  &nbsp;  
##### 4.12.0
- more-sensible responses for invalid, non-string inputs
##### 4.11.0
- 14 PRs, with fixes for currencies, pluralization, conjugation
##### 4.10.0
- Value.to_text() new method, fix "Posessive" POS typo
##### 4.9.0
- return of the text.spot() method (Re:#107)
##### 4.8.0
- more aggressive lumping of dates, like 'last week of february'
##### 4.7.0
- whitespace reproduction in .text() methods
##### 4.6.0
- move negate from sentence to verb & statement
##### 4.2.0
- rename 'implicit' to 'expansion' for smarter contractions
##### 4.1.3
- added readable-compression to adj, verbs (121kb -> 117kb)
##### 4.1.0
- hyphenated words are normalized into spaces
##### 4.0.0
- grammar-aware match & replace functions

### v3  &nbsp;  **(Breaking)**
##### 3.0.2
- Statement & Question classes
##### 3.0.0 - Feb 2016
- split ngram, locale, and syllables into plugins in seperate repo

### v2
##### 2.0.0 - Nov 2015 &nbsp;  **(Breaking)**
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

### v1
##### 1.1.0 - May 2015
- smarter handling of ambiguous contractions ("he's" -> ["he is", "he has"])
##### 1.0.0 - May 2015
- added name genders and beginning of co-reference resolution ('Tony' -> 'he') API.
- small breaking change on ```Noun.is_plural``` and ```Noun.is_entity```, affording significant pos() speedup. Bumped Major version for these changes.

### v0
##### 0.5.2 - May 2015
- Phrasal verbs ('step up'), firstnames and .people()
##### 0.4.0 - May 2015
- Major file-size reduction through refactoring
##### 0.3.0 - Jan 2015
- New NER choosing algorithm, better capitalisation logic, consolidated tests
##### 0.2.0 - Nov 2014
- Sentence class methods, client-side demos
