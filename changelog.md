Uses semver, with occasional releases to npm and bower.

here, 'Major' is considered an api change, while 'Minor' is considered a performance change.

### v.6  &nbsp;  
* 6.5.0 - builds now using browserify + derequire()
* 6.4.0 - re-written term-lumper logic
* 6.3.0 - new nlp.lexicon({word:'POS'}) flow
* 6.0.0 - be consistent with `text.normal()`, `term.all_forms()`, `text.word_count()`. `text.normal()` includes sentence-terminators, like periods etc.

### v.5  &nbsp;  
* 5.2.0 - airport codes support, helper methods for specific POS
* 5.1.0 - newlines split sentences
* 5.0.0 - Text methods now return this, instead of array of sentences

### v.4  &nbsp;  
* 4.12.0 - more-sensible responses for invalid, non-string inputs
* 4.11.0 - 14 PRs, with fixes for currencies, pluralization, conjugation
* 4.10.0 - Value.to_text() new method, fix "Posessive" POS typo
* 4.9.0 - return of the text.spot() method (Re:#107)
* 4.8.0 - more aggressive lumping of dates, like 'last week of february'
* 4.7.0 - whitespace reproduction in .text() methods
* 4.6.0 - move negate from sentence to verb & statement
* 4.2.0 - rename 'implicit' to 'expansion' for smarter contractions
* 4.1.3 - added readable-compression to adj, verbs (121kb -> 117kb)
* 4.1.0 - hyphenated words are normalized into spaces
* 4.0.0 - grammar-aware match & replace functions

### v.3  &nbsp;  **(Breaking)**
* 3.0.2 - Statement & Question classes
* v3.0.0 - Feb 2016
  * split ngram, locale, and syllables into plugins in seperate repo

### v.2
* v2.0.0 - Nov 2015 &nbsp;  **(Breaking)**
  * es6 classes, babel building
  * better test coverage
  * ngram uses term tokenization, so that 'Tony Hawk' us one term, and not two
  * more organized pos rules
  * Pos tagging is done implicitly now once nlp.Text is run
  * Entity spotting is split into .people(), .place(), .organisations()
  * unicode normalisation is killed
  * opaque two-letter tags are gone
  * plugin support
  * passive tense detection
  * lexicon can be augmented third-party
  * date parsing results are different

### v.1
* v1.1.0 - May 2015
smarter handling of ambiguous contractions ("he's" -> ["he is", "he has"])

* v1.0.0 - May 2015
added name genders and beginning of co-reference resolution ('Tony' -> 'he') API.
small breaking change on ```Noun.is_plural``` and ```Noun.is_entity```, affording significant pos() speedup. Bumped Major version for these changes.

### v.0

* v0.5.2 - May 2015
Phrasal verbs ('step up'), firstnames and .people()

* v0.4.0 - May 2015
Major file-size reduction through refactoring

* v0.3.0 - Jan 2015
New NER choosing algorithm, better capitalisation logic, consolidated tests

* v0.2.0 - Nov 2014
Sentence class methods, client-side demos
