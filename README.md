<div align="center">
  <div><b>compromise</b></div>
  <img src="https://user-images.githubusercontent.com/399657/68222691-6597f180-ffb9-11e9-8a32-a7f38aa8bded.png"/>
  <div>modest natural language processing</div>
  <div><code>npm install compromise</code></div>
  <div align="center">
    <sub>
      by
      <a href="https://github.com/spencermountain">Spencer Kelly</a> and
      <a href="https://github.com/spencermountain/compromise/graphs/contributors">
        many contributors
      </a>
    </sub>
  </div>
  <img height="25px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
</div>

<div align="center">
  <div>
    <a href="https://npmjs.org/package/compromise">
    <img src="https://img.shields.io/npm/v/compromise.svg?style=flat-square" />
  </a>
  <a href="https://www.codacy.com/app/spencerkelly86/nlp_compromise">
    <img src="https://api.codacy.com/project/badge/Coverage/82cc8ebd98b64ed199d7be6021488062" />
  </a>
  <a href="https://unpkg.com/compromise">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise/master/builds/compromise.min.js" />
  </a>
  </div>
</div>

<div align="center">
  compromise is <a href="https://github.com/spencermountain/compromise/wiki/Justification">not the cleverest</a>.
  <br/>
  but it is
  <a href="https://docs.compromise.cool/compromise-filesize">small,
  <a href="https://docs.compromise.cool/compromise-performance">quick</a>,
  and <a href="https://docs.compromise.cool/compromise-accuracy">good-enough</a> for a bunch of things.
</div>

<!-- spacer -->
<img height="50px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### .match():

compromise makes it simple to interpret and match text:

```js
let doc = nlp(entireNovel)

doc.if('the #Adjective of times').text()
// "it was the blurst of times??"
```

```js
if (doc.has('^simon says #Verb+')) {
  return doc.match('#Verb .*').text()
}
```

<div align="right">
  <a href="https://docs.compromise.cool/compromise-match-syntax">match docs</a>
</div>
<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221837-0d142480-ffb8-11e9-9d30-90669f1b897c.png"/>
</div>

### .verbs():

conjugate and negate verbs in any tense:

```js
let doc = nlp('she sells seashells by the seashore.')
  .verbs()
  .toPastTense()
doc.text()
// 'she sold seashells by the seashore.'
```

<div align="right">
  <a href="https://docs.compromise.cool/verbs">verb docs</a>
</div>
<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221824-09809d80-ffb8-11e9-9ef0-6ed3574b0ce8.png"/>
</div>

### .nouns():

transform nouns to plural and possessive forms:

```js
let doc = nlp('the purple dinosaur')
  .nouns()
  .toPlural()
doc.text()
// 'the purple dinosaurs'
```

<div align="right">
  <a href="https://docs.compromise.cool/nouns">noun docs</a>
</div>
<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221731-e8b84800-ffb7-11e9-8453-6395e0e903fa.png"/>
</div>

### .numbers():

interpret plaintext numbers

```js
nlp.extend(require('compromise-numbers'))

let doc = nlp('ninety five thousand and fifty two')
doc
  .numbers()
  .toNumber()
  .add(2)
doc.text()
// '95054'
```

<div align="right">
  <a href="https://docs.compromise.cool/compromise-values">number docs</a>
</div>
<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221814-05ed1680-ffb8-11e9-8b6b-c7528d163871.png"/>
</div>

### .topics():

grab the subjects of a text:

```js
nlp.extend(require('compromise-entities'))

nlp(buddyHolly)
  .people()
  .if('mary')
  .json()
// [{text:'Mary Tyler Moore'}]

nlp(freshPrince)
  .places()
  .first()
  .text()
// 'West Phillidelphia'

doc = nlp('the opera about richard nixon visiting china')
doc.topics().json()
// [
//   { text: 'richard nixon' },
//   { text: 'china' }
// ]
```

<div align="right">
  <a href="https://docs.compromise.cool/topics-named-entity-recognition">topics docs</a>
</div>

<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221632-b9094000-ffb7-11e9-99e0-b48edd6cdf8a.png"/>
</div>

### .contractions():

work with contracted and expanded words:

```js
let doc = nlp("we're not gonna take it, no we ain't gonna take it.")

// match within a contraction
doc.has('going') // true

// transform
doc.contractions().expand()
dox.text()
// 'we are not going to take it, no we are not going to take it.'
```

<div align="right">
  <a href="https://docs.compromise.cool/compromise-contractions">contraction docs</a>
</div>
<div align="center">
  <img src="https://user-images.githubusercontent.com/399657/68221731-e8b84800-ffb7-11e9-8453-6395e0e903fa.png"/>
  <!-- spacer -->
  <img height="30" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
</div>

Use it on the client-side:

```html
<script src="https://unpkg.com/compromise"></script>
<script>
  var doc = nlp('dinosaur')

  var str = doc
    .nouns()
    .toPlural()
    .out('text')
  console.log(str)
  // 'dinosaurs'
</script>
```

or as an esmodule:

```typescript
import nlp from 'compromise'

var doc = nlp('London is calling')
doc.verbs().toNegative()
// 'London is not calling'
```

<!-- spacer -->
<img height="30" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

compromise is **170kb** (minified):

<div align="center">
  <!-- filesize -->
  <img width="600" src="https://user-images.githubusercontent.com/399657/68234819-14dfc300-ffd0-11e9-8b30-cb8545707b29.png"/>
</div>

it's pretty fast. It can run on keypress:

<div align="center">
  <img width="600" src="https://user-images.githubusercontent.com/399657/68234798-0abdc480-ffd0-11e9-9ac5-8875d185a631.png"/>
</div>

it works mainly by conjugating many forms of a basic word list.

The final lexicon is > 14,000 words:

<div align="center">
  <img width="600" src="https://user-images.githubusercontent.com/399657/68234805-0d201e80-ffd0-11e9-8dc6-f7a600352555.png"/>
</div>

you can read more about how it works, [here](http://blog.spencermounta.in/2019/building-compromise/index.html).

<!-- spacer -->
  <!-- <img height="25px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/> -->
<div align="center">
  <img src="https://user-images.githubusercontent.com/399657/68221814-05ed1680-ffb8-11e9-8b6b-c7528d163871.png"/>
</div>

### .extend():

pass-in an object with your own words:

```js
let myWords = {
  kermit: 'FirstName',
  fozzie: 'FirstName',
}
let doc = nlp(muppetText, myWords)
```

or change the library's internal data:

```js
const nlp = require('compromise')

nlp.extend((Doc, world) => {
  // add new tags
  world.addTags({
    Character: {
      isA: 'Person',
      notA: 'Adjective',
    },
  })

  // add or change words in the lexicon
  world.addWords({
    kermit: 'Character',
    gonzo: 'Character',
  })

  // add methods to run after the tagger
  world.postProcess(doc => {
    doc.match('light the lights').tag('#Verb . #Plural')
  })

  // add a whole new method
  Doc.prototype.kermitVoice = function() {
    this.sentences().prepend('well,')
    this.match('i [(am|was)]').prepend('um,')
    return this
  }
})
```

<div align="right">
  <a href="https://docs.compromise.cool/compromise-plugins">.extend() docs</a>
</div>
<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221848-11404200-ffb8-11e9-90cd-3adee8d8564f.png"/>
</div>

### API:

##### Constructor

_these methods are on the `nlp` object_

- **[.tokenize()](http://docs.compromise.cool/compromise-tokenize)** - parse text without running POS-tagging
- **[.extend()](#)** - mix in a compromise-plugin
- **[.clone()](#)** - make a deep-copy of the library state
- **[.load()](#)** - re-generate a Doc object from .export() results
- **[.verbose()](#)** - log our decision-making for debugging
- **[.version()](#)** - current semver version of the library

##### Utils

- **[.all()](#)** - return the whole original document ('zoom out')
- **[.found]()** _[getter]_ - is this document empty?
- **[.parent()](#)** - return the previous result
- **[.parents()](#)** - return all of the previous results
- **[.tagger()](#)** - (re-)run the part-of-speech tagger on this document
- **[.wordCount()](#)** - count the # of terms in the document
- **[.length]()** _[getter]_ - count the # of characters in the document (string length)
- **[.clone()](#)** - deep-copy the document, so that no references remain
- **[.cache({})]()** - freeze the current state of the document, for speed-purposes
- **[.uncache()](#)** - un-freezes the current state of the document, so it may be transformed

##### Accessors

- **[.first(n)]()** - use only the first result(s)
- **[.last(n)]()** - use only the last result(s)
- **[.slice(n,n)]()** - grab a subset of the results
- **[.eq(n)]()** - use only the nth result
- **[.firstTerm()](#)** - get the first word in each match
- **[.lastTerm()](#)** - get the end word in each match
- **[.termList()](#)** - return a flat list of all Term objects in match

##### Match

_all match methods use the [match-syntax](https://docs.compromise.cool/compromise-match-syntax)._

- **[.match('')]()** - return a new Doc, with this one as a parent
- **[.not('')]()** - return all results except for this
- **[.matchOne('')]()** - return only the first match
- **[.if('')]()** - return each current phrase, only if it contains this match ('only')
- **[.ifNo()](#)** - Filter-out any current phrases that have this match ('notIf')
- **[.has()](#)** - Return a boolean if this match exists
- **[.lookBehind('')]()** - search through earlier terms, in the sentence
- **[.lookAhead('')]()** - search through following terms, in the sentence
- **[.before('')]()** - return all terms before a match, in each phrase
- **[.after('')]()** - return all terms after a match, in each phrase

##### Case

- **[.toLowerCase()](#)** - turn every letter of every term to lower-cse
- **[.toUpperCase()](#)** - turn every letter of every term to upper case
- **[.toTitleCase()](#)** - upper-case the first letter of each term
- **[.toCamelCase()](#)** - remove whitespace and title-case each term

##### Whitespace

- **[.pre('')]()** - add this punctuation or whitespace before each match
- **[.post('')]()** - add this punctuation or whitespace after each match
- **[.trim()](#)** - remove start and end whitespace
- **[.hyphenate()](#)** - connect words with hyphen, and remove whitespace
- **[.dehyphenate()](#)** - remove hyphens between words, and set whitespace

##### Tag

- **[.tag('')]()** - Give all terms the given tag
- **[.tagSafe('')]()** - Only apply tag to terms if it is consistent with current tags
- **[.unTag('')]()** - Remove this term from the given terms
- **[.canBe('')]()** - return only the terms that can be this tag

##### Loops

- **[.map(fn)]()** - run each phrase through a function, and create a new document
- **[.forEach(fn)]()** - run a function on each phrase, as an individual document
- **[.filter(fn)]()** - return only the phrases that return true
- **[.find(fn)]()** - return a document with only the first phrase that matches
- **[.some(fn)]()** - return true or false if there is one matching phrase
- **[.random(fn)]()** - sample a subset of the results

##### Insert

- **[.replace(match, replace)]()** - search and replace match with new content
- **[.replaceWith(replace)]()** - substitute-in new text
- **[.delete()](#)** - fully remove these terms from the document
- **[.append(str)]()** - add these new terms to the end (insertAfter)
- **[.prepend(str)]()** - add these new terms to the front (insertBefore)
- **[.concat()](#)** - add these new things to the end

##### Transform

- **[.sort('method')]()** - re-arrange the order of the matches (in place)
- - **_'alpha'_** - [default] alphabetical order
- - **_'index'_** - the 'chronological', or original document sort order
- - **_'freq'_** - sort by # of duplicates in the document
- - **_'wordcount'_** - sort by # of terms in each result
- - **_'length'_** - sort by character counts of each result
- **[.reverse()](#)** - reverse the order of the matches, but not the words
- **[.normalize({})]()** - clean-up the text in various ways
- **[.unique()](#)** - remove any duplicate matches
- **[.split('')]()** - return a Document with three parts for every match ('splitOn')
- **[.splitBefore('')]()** - separate everything after the match as a new phrase
- **[.splitAfter('')]()** - separate everything before the word, as a new phrase
- **[.segment({})]()** - split a document into labeled sections
- **[.join('')]()** - make all phrases into one phrase

##### Output

- **[.text('method')]()** - return the document as text

there are 4 preset text outputs:

- **_'text'_** - a perfect copy of the input text (default)
- **_'normal'_** - normalized whitespace, case, unicode, punctuation
- **_'clean'_** - 'normal' + lowercase, trimmed whitespace
- **_'reduced'_** - 'clean' + contractions expanded.
- **_'root'_** - for machine-reading, inflected verbs, singular nouns. Like a 'stemmed' text.

you can toggle any of these options, using an object as a parameter:

- **_case_ : false**,
- **_punctuation_ : false**,
- **_whitespace_ : false**,
- **_unicode_ : false**,
- **_implicit_ : false**,
- **_root_ : false**

- **[.json({})](https://docs.compromise.cool/compromise-json)** - pull out desired metadata from the document

you can specify which data you'd like to return with these options:

- **_text_ : true**,
- **_normal_** : true,
- **_reduced_** : true,
- **_root_ : true,**
- **_trim_**
- **_offset_**
- **_wordCount_**
  - **_text_**
  - **_tags_**
  - **_id_**
  - **_normal_**
  - **_offset_**
- **[.out('array|offset|terms')]()** - some named output formats (deprecated)
- **[.debug()](#)** - pretty-print the current document and its tags
- **[.export()](#)** - store a parsed document for later use

##### Selections

- **[.terms()](#)** - split-up results by each individual term
- **[.clauses()](#)** - split-up sentences into multi-term phrases
- **[.hyphenated()](#)** - all terms connected with a hyphen or dash like `'wash-out'`
- **[.phoneNumbers()](#)** - things like `'(939) 555-0113'`
- **[.hashTags()](#)** - things like `'#nlp'`
- **[.emails()](#)** - things like `'hi@compromise.cool'`
- **[.emoticons()](#)** - things like `:)`
- **[.emojis()](#)** - things like `💋`
- **[.atMentions()](#)** - things like `'@nlp_compromise'`
- **[.urls()](#)** - things like `'compromise.cool'`
- **[.adverbs()](#)** - things like `'quickly'`
- **[.pronouns()](#)** - things like `'he'`
- **[.conjunctions()](#)** - things like `'but'`
- **[.prepositions()](#)** - things like `'of'`
- **[.abbreviations()](#)** - things like `'Mrs.'`

- ##### Subsets
- **[.contractions()](#)** - things like "didn't"
- **[.parentheses()](#)** - return anything inside (parentheses)
- **[.possessives()](#)** - things like `"Spencer's"`
- **[.quotations()](#)** - return any terms inside quotation marks
- **[.acronyms()](#)** - things like `'FBI'`
- **[.lists()](#)** - things like `'eats, shoots, and leaves'`
- **[.nouns()](#)** - return any subsequent terms tagged as a Noun
  - **[.nouns().json()](#)** - overloaded output with noun metadata
  - **[.nouns().toPlural()](#)** - `'football captain' → 'football captains'`
  - **[.nouns().toSingular()](#)** - `'turnovers' → 'turnover'`
  - **[.nouns().isPlural()](#)** - return only plural nouns
  - **[.nouns().isSingular()](#)** - return only singular nouns
  - **[.nouns().hasPlural()](#)** - return only nouns that _can be_ inflected as plural
  - **[.nouns().toPossessive()](#)** - add a `'s` to the end, in a safe manner.
- **[.verbs()](#)** - return any subsequent terms tagged as a Verb
  - **[.verbs().json()](#)** - overloaded output with verb metadata
  - **[.verbs().conjugate()](#)** - return all forms of these verbs
  - **[.verbs().toPastTense()](#)** - `'will go' → 'went'`
  - **[.verbs().toPresentTense()](#)** - `'walked' → 'walks'`
  - **[.verbs().toFutureTense()](#)** - `'walked' → 'will walk'`
  - **[.verbs().toInfinitive()](#)** - `'walks' → 'walk'`
  - **[.verbs().toGerund()](#)** - `'walks' → 'walking'`
  - **[.verbs().toNegative()](#)** - `'went' → 'did not go'`
  - **[.verbs().toPositive()](#)** - `"didn't study" → 'studied'`
  - **[.verbs().isNegative()](#)** - return verbs with 'not'
  - **[.verbs().isPositive()](#)** - only verbs without 'not'
  - **[.verbs().isPlural()](#)** - return plural verbs like 'we walk'
  - **[.verbs().isSingular()](#)** - return singular verbs like 'spencer walks'
  - **[.verbs().adverbs()](#)** - return the adverbs describing this verb.

<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221824-09809d80-ffb8-11e9-9ef0-6ed3574b0ce8.png"/>
</div>

### Plugins:

These are some helpful extensions:

##### Adjectives

`npm install compromise-adjectives`

- **[.adjectives()](#)** - like `quick`
  - **[.numbers().json()](#)** - overloaded output with adjective metadata
  - **[.numbers().conjugate()](#)** - return all conjugated forms of this adjective
  - **[.numbers().toSuperlative()](#)** - convert `quick` to `quickest`
  - **[.numbers().toComparative()](#)** - convert `quick` to `quickest`
  - **[.numbers().toAdverb()](#)** - convert `quick` to `quickly`
  - **[.numbers().toVerb()](#)** - convert `quick` to `quicken`
  - **[.numbers().toNoun()](#)** - convert `quick` to `quickness`

##### Dates

`npm install compromise-dates`

- **[.dates()](#)** - find dates like `June 8th` or `03/03/18`
  - **[.dates().json()](#)** - overloaded output with date metadata

##### Topics

`npm install compromise-topics`

- **[.people()](#)** - names like 'John F. Kennedy'
- **[.places()](#)** - like 'Paris, France'
- **[.organizations()](#)** - like 'Google, Inc'
- **[.topics()](#)** - `people()` + `places()` + `organizations()`

##### Numbers

`npm install compromise-numbers`

- **[.numbers()](#)** - grab all written and numeric values
  - **[.numbers().json()](#)** - overloaded output with number metadata
  - **[.money()](#)** - things like `'$2.50'`
  - **[.fractions()](#)** - things like `1/3rd`
  - **[.numbers().toText()](#)** - convert number to `five` or `fifth`
  - **[.numbers().toNumber()](#)** - convert number to `5` or `5th`
  - **[.numbers().toOrdinal()](#)** - convert number to `fifth` or `5th`
  - **[.numbers().toCardinal()](#)** - convert number to `five` or `5`
  - **[.numbers().add(n)]()** - increase number by n
  - **[.numbers().subtract(n)]()** - decrease number by n
  - **[.numbers().increment()](#)** - increase number by 1
  - **[.numbers().decrement()](#)** - decrease number by 1
  - **[.numbers().isEqual(n)]()** - return numbers with this value
  - **[.numbers().greaterThan(min)]()** - return numbers bigger than n
  - **[.numbers().lessThan(max)]()** - return numbers smaller than n
  - **[.numbers().between(min, max)]()** - return numbers between min and max
  - **[.numbers().isOrdinal()](#)** - return only ordinal numbers
  - **[.numbers().isCardinal()](#)** - return only cardinal numbers
  - **[.numbers().toLocaleString()](#)** - add commas, or nicer formatting for numbers

##### Ngrams

`npm install compromise-ngrams`

- **[.ngrams({})]()** - list all repeating sub-phrases, by word-count
- **[.unigrams()](#)** - n-grams with one word
- **[.bigrams()](#)** - n-grams with two words
- **[.trigrams()](#)** - n-grams with three words
- **[.startgrams()](#)** - n-grams including the first term of a phrase
- **[.endgrams()](#)** - n-grams including the last term of a phrase
- **[.edgegrams()](#)** - n-grams including the first or last term of a phrase

##### Output

`npm install compromise-output`

- **[.hash()](#)** - generate an md5 hash from the document+tags
- **[.html({})]()** - generate sanitized html from the document

##### Paragraphs

`npm install compromise-paragraphs`
this plugin creates a wrapper around the default sentence objects.

- **[.paragraphs()](#)** - return groups of sentences
  - **[.paragraphs().json()](#)** - output metadata for each paragraph
  - **[.paragraphs().sentences()](#)** - go back to a regular Doc object
  - **[.paragraphs().terms()](#)** -
  - **[.paragraphs().eq()](#)** -
  - **[.paragraphs().first()](#)** -
  - **[.paragraphs().last()](#)** -
  - **[.paragraphs().match()](#)** -
  - **[.paragraphs().not()](#)** -
  - **[.paragraphs().if()](#)** -
  - **[.paragraphs().ifNo()](#)** -
  - **[.paragraphs().has()](#)** -
  - **[.paragraphs().forEach()](#)** -
  - **[.paragraphs().map()](#)** -
  - **[.paragraphs().filter()](#)** -

##### Sentences

`npm install compromise-sentences`

- **[.sentences()](#)** - return a sentence class with additional methods
  - **[.sentences().json()](#)** - overloaded output with sentence metadata
  - **[.sentences().subjects()](#)** - return the main noun of each sentence
  - **[.sentences().toPastTense()](#)** -
  - **[.sentences().toPresentTense()](#)** -
  - **[.sentences().toFutureTense()](#)** -
  - **[.sentences().toContinuous()](#)** -
  - **[.sentences().toNegative()](#)** -
  - **[.sentences().toPositive()](#)** -
  - **[.sentences().isPassive()](#)** -
  - **[.sentences().isQuestion()](#)** - return questions with a `?`
  - **[.sentences().isExclamation()](#)** - return sentences with a `!`
  - **[.sentences().isStatement()](#)** - return sentences without `?` or `!`
  - **[.sentences().prepend()](#)** - smarter prepend that repairs whitespace + titlecasing
  - **[.sentences().append()](#)** - smarter append that repairs sentence punctuation
  - **[.sentences().toExclamation()](#)** -
  - **[.sentences().toQuestion()](#)** -
  - **[.sentences().toStatement()](#)** -
  -

##### Syllables

`npm install compromise-syllables`

- **[.syllables()](#)** - split each term by its typical pronounciation

<!-- spacer -->
<div >
  <img height="25px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
  <hr/>
  <img height="25px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
</div>

<!-- spacer -->
<div >
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
</div>

### Docs:

##### Tutorials:

- **[Tutorial #1](https://docs.compromise.cool/tutorial-1)** - Input → output
- **[Tutorial #2](https://docs.compromise.cool/compromise-tutorial-2)** - Match & transform
- **[Tutorial #3](https://docs.compromise.cool/compromise-making-a-bot)** - Making a chat-bot
  <!-- * **[Tutorial #4]()**  -  Making a plugin -->

##### 3rd party:

- **[Geocoding Social Conversations with NLP and JavaScript](http://compromise.cool)** - by Microsoft
- **[Microservice Recipe](https://eventn.com/recipes/text-parsing-with-nlp-compromise)** - by Eventn
- **[Building Text-Based Games](https://killalldefects.com/2019/09/24/building-text-based-games-with-compromise-nlp/)** - by Matt Eland
- **[Fun with javascript in BigQuery](https://medium.com/@hoffa/new-in-bigquery-persistent-udfs-c9ea4100fd83#6e09)** - by Felipe Hoffa

##### Talks:

- **[Language as an Interface](https://www.youtube.com/watch?v=WuPVS2tCg8s)** - by Spencer Kelly
- **[Coding Chat Bots](https://www.youtube.com/watch?v=c_hmwFwvO0U)** - by KahWee Teng

<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221824-09809d80-ffb8-11e9-9ef0-6ed3574b0ce8.png"/>
</div>

##### Some fun Applications:

- **[Chat dialogue framework](http://superscriptjs.com/)** - by Rob Ellis
- **[Automated Bechdel Test](https://github.com/guardian/bechdel-test)** - by The Guardian
- **[Story generation framework](https://perchance.org/welcome)** - by Jose Phrocca
- **[Tumbler blog of lists](https://leanstooneside.tumblr.com/)** - horse-ebooks-like lists - by Michael Paulukonis
- **[Video Editing from Transcription](https://newtheory.io/)** - by New Theory
- **[Browser extension Fact-checking](https://github.com/AlexanderKidd/FactoidL)** - by Alexander Kidd
- **[Siri shortcut](https://routinehub.co/shortcut/3260)** - by Michael Byrns
- **[Amazon skill](https://github.com/tajddin/voiceplay)** - by Tajddin Maghni
- **[Tasking Slack-bot](https://github.com/kevinsuh/toki)** - by Kevin Suh

<!-- spacer -->
<div align="center">
  <img height="25px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
  <hr/>
</div>

#### Limitations:

- **slash-support:**
  We currently split slashes up as different words, like we do for hyphens. so things like this don't work:
  <code>nlp('the koala eats/shoots/leaves').has('koala leaves') //false</code>

- **inter-sentence match:**
  By default, sentences are the top-level abstraction.

  Inter-sentence, or multi-sentence matches aren't supported:
  <code>nlp("that's it. Back to Winnipeg!").has('it back')//false</code>

- **nested match syntax:**
  the <s>danger</s> beauty of regex is that you can recurse indefinitely.

  Our match syntax is much weaker. Things like this are not <i>(yet)</i> possible:
  <code>doc.match('(modern (major|minor))? general')</code>
  complex matches must be achieved with successive **.match()** statements.

- **dependency parsing:**
  Proper sentence transformation requires understanding the [syntax tree](https://en.wikipedia.org/wiki/Parse_tree) of a sentence, which we don't currently do.
  We should! Help wanted with this.

##### FAQ

<ul align="left">
  <p>
    <details>
      <summary>☂️ Isn't javascript too...</summary>
      <p></p>
      <ul>
        yeah it is!
        <br/>
        it wasn't built to compete with NLTK, and may not fit every project.
        <br/>
        string processing is synchronous too, and parallelizing node processes is weird.
        <br/>
        See <a href="https://docs.compromise.cool/compromise-performance">here</a> for information about speed & performance, and
        <a href="https://github.com/spencermountain/compromise/wiki/Justification">here</a> for project motivations
      </ul>
      <p></p>
    </details>
  </p>  
  <p>
    <details>
      <summary>💃 Can it run on my arduino-watch?</summary>
      <p></p>
      <ul>
        Only if it's water-proof!
        <br/>
        Read <a href="https://github.com/spencermountain/compromise/wiki/QuickStart">quick start</a> for running compromise in workers, mobile apps, and all sorts of funny environments.
      </ul>
      <p></p>
    </details>
  </p>
  <p>
    <details>
      <summary>🌎 Compromise in other Languages?</summary>
      <p></p>
      <ul>
        we've got work-in-progress forks for <a href="https://github.com/nlp-compromise/de-compromise">German</a> and <a href="https://github.com/nlp-compromise/fr-compromise">French</a>, in the same philosophy.
        <br/>
        and need some help.
      </ul>
      <p></p>
    </details>
  </p>
  <p>
    <details>
      <summary>✨ Partial builds?</summary>
      <p></p>
      <ul>
        compromise isn't easily tree-shaken.
        <br/> 
        the tagging methods are competitive, and greedy, so it's not recommended to pull things out.
        <br/> 
        It's recommended to run the library fully.
      </ul>
      <p></p>
    </details>
  </p>
</ul>

<div align="center">
  <img src="https://user-images.githubusercontent.com/399657/68221731-e8b84800-ffb7-11e9-8453-6395e0e903fa.png"/>
</div>

#### See Also:

- &nbsp; **[naturalNode](https://github.com/NaturalNode/natural)** - fancier statistical nlp in javascript
- &nbsp; **[superScript](http://superscriptjs.com/)** - clever conversation engine in js
- &nbsp; **[nodeBox linguistics](https://www.nodebox.net/code/index.php/Linguistics)** - conjugation, inflection in javascript
- &nbsp; **[reText](https://github.com/wooorm/retext)** - very impressive [text utilities](https://github.com/wooorm/retext/blob/master/doc/plugins.md) in javascript
- &nbsp; **[jsPos](https://code.google.com/archive/p/jspos/)** - javascript build of the time-tested Brill-tagger
- &nbsp; **[spaCy](https://spacy.io/)** - speedy, multilingual tagger in C/python

<img height="25px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

**MIT**
