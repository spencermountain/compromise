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
  <a href="https://codecov.io/gh/spencermountain/compromise">
    <img src="https://codecov.io/gh/spencermountain/compromise/branch/master/graph/badge.svg" />
  </a>
  <a href="https://bundlephobia.com/result?p=compromise">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise/master/builds/compromise.min.js" />
  </a>
  <a href="https://spectrum.chat/nlp-compromise">
    <img src="https://img.shields.io/badge/spectrum-chat-%23b14344" />
  </a>
  </div>
</div>

<!-- spacer -->
<img height="15px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

<div align="left">
  <img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>compromise <a href="https://observablehq.com/@spencermountain/compromise-justification">tries its best</a>.
</div>

<div align="left">
 <img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
  it is
  <a href="https://docs.compromise.cool/compromise-filesize">small,
  <a href="https://docs.compromise.cool/compromise-performance">quick</a>,
  and <a href="https://docs.compromise.cool/compromise-accuracy">usually good-enough</a>.
</div>

<!-- spacer -->
<img height="50px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

<div align="right">
  <code>
    Welcome to v12! - <a href="https://github.com/spencermountain/compromise/wiki/v12-Release-Notes">Release Notes here 👍</a>
  </code>
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
if (doc.has('simon says #Verb')) {
  return true
}
```

<div align="right">
  <a href="https://docs.compromise.cool/compromise-match">match docs</a>
</div>
<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221837-0d142480-ffb8-11e9-9d30-90669f1b897c.png"/>
</div>

### .verbs():

conjugate and negate verbs in any tense:

```js
let doc = nlp('she sells seashells by the seashore.')
doc.verbs().toPastTense()
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
doc.nouns().toPlural()
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
doc.numbers().add(2)
doc.text()
// 'ninety five thousand and fifty four'
```

<div align="right">
  <a href="https://docs.compromise.cool/compromise-values">number docs</a>
</div>
<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221814-05ed1680-ffb8-11e9-8b6b-c7528d163871.png"/>
</div>

### .topics():

grab subjects in a text:

```js
let doc = nlp(buddyHolly)
doc
  .people()
  .if('mary')
  .json()
// [{text:'Mary Tyler Moore'}]

let doc = nlp(freshPrince)
doc
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

work with contracted and implicit words:

```js
let doc = nlp("we're not gonna take it, no we ain't gonna take it.")

// match an implicit term
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
<script src="https://unpkg.com/compromise-numbers"></script>
<script>
  nlp.extend(compromiseNumbers)

  var doc = nlp('two bottles of beer')
  doc.numbers().minus(1)
  document.body.innerHTML = doc.text()
  // 'one bottle of beer'
</script>
```

or as an es-module:

```typescript
import nlp from 'compromise'

var doc = nlp('London is calling')
doc.verbs().toNegative()
// 'London is not calling'
```

or if you don't care about POS-tagging, you can use the tokenize-only build: (90kb!)

```html
<script src="https://unpkg.com/compromise/builds/compromise-tokenize.js"></script>
<script>
  var doc = nlp('No, my son is also named Bort.')
  //you can see the text has no tags
  console.log(doc.has('#Noun')) //false
  //but the whole api still works
  console.log(doc.has('my .* is .? named /^b[oa]rt/')) //true
</script>
```

<!-- spacer -->
<img height="30" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

compromise is **170kb** (minified):

<div align="center">
  <!-- filesize -->
  <a href="https://bundlephobia.com/result?p=compromise">
    <img width="600" src="https://user-images.githubusercontent.com/399657/68234819-14dfc300-ffd0-11e9-8b30-cb8545707b29.png"/>
  </a>
</div>

it's pretty fast. It can run on keypress:

<div align="center">
  <a href="https://observablehq.com/@spencermountain/compromise-performance">
    <img width="600" src="https://user-images.githubusercontent.com/399657/68234798-0abdc480-ffd0-11e9-9ac5-8875d185a631.png"/>
  </a>
</div>

it works mainly by <a href="https://observablehq.com/@spencermountain/verbs">conjugating many forms</a> of a basic word list.

The final lexicon is <a href="https://observablehq.com/@spencermountain/compromise-lexicon">~14,000 words</a>:

<div align="center">
  <img width="600" src="https://user-images.githubusercontent.com/399657/68234805-0d201e80-ffd0-11e9-8dc6-f7a600352555.png"/>
</div>

you can read more about how it works, [here](https://observablehq.com/@spencermountain/compromise-internals).

<!-- spacer -->
  <!-- <img height="25px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/> -->
<div align="center">
  <img src="https://user-images.githubusercontent.com/399657/68221814-05ed1680-ffb8-11e9-8b6b-c7528d163871.png"/>
</div>

### .extend():

set a custom interpretation of your own words:

```js
let myWords = {
  kermit: 'FirstName',
  fozzie: 'FirstName',
}
let doc = nlp(muppetText, myWords)
```

or make more changes with a [compromise-plugin](https://observablehq.com/@spencermountain/compromise-plugins).

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

_(these methods are on the `nlp` object)_

- **[.tokenize()](https://observablehq.com/@spencermountain/compromise-tokenization)** - parse text without running POS-tagging
- **[.extend()](https://observablehq.com/@spencermountain/compromise-constructor-methods)** - mix in a compromise-plugin
- **[.fromJSON()](https://observablehq.com/@spencermountain/compromise-constructor-methods)** - load a compromise object from `.json()` result
- **[.verbose()](https://observablehq.com/@spencermountain/compromise-constructor-methods)** - log our decision-making for debugging
- **[.version()](https://observablehq.com/@spencermountain/compromise-constructor-methods)** - current semver version of the library

##### Utils

- **[.all()](https://observablehq.com/@spencermountain/compromise-utils)** - return the whole original document ('zoom out')
- **[.found](https://observablehq.com/@spencermountain/compromise-utils)** _[getter]_ - is this document empty?
- **[.parent()](https://observablehq.com/@spencermountain/compromise-utils)** - return the previous result
- **[.parents()](https://observablehq.com/@spencermountain/compromise-utils)** - return all of the previous results
- **[.tagger()](https://observablehq.com/@spencermountain/compromise-tagger)** - (re-)run the part-of-speech tagger on this document
- **[.wordCount()](https://observablehq.com/@spencermountain/compromise-utils)** - count the # of terms in the document
- **[.length](https://observablehq.com/@spencermountain/compromise-utils)** _[getter]_ - count the # of characters in the document (string length)
- **[.clone()](https://observablehq.com/@spencermountain/compromise-utils)** - deep-copy the document, so that no references remain
- **[.cache({})](https://observablehq.com/@spencermountain/compromise-cache)** - freeze the current state of the document, for speed-purposes
- **[.uncache()](https://observablehq.com/@spencermountain/compromise-cache)** - un-freezes the current state of the document, so it may be transformed

##### Accessors

- **[.first(n)](https://observablehq.com/@spencermountain/compromise-accessors)** - use only the first result(s)
- **[.last(n)](https://observablehq.com/@spencermountain/compromise-accessors)** - use only the last result(s)
- **[.slice(n,n)](https://observablehq.com/@spencermountain/compromise-accessors)** - grab a subset of the results
- **[.eq(n)](https://observablehq.com/@spencermountain/compromise-accessors)** - use only the nth result
- **[.terms()](https://observablehq.com/@spencermountain/compromise-selections)** - split-up results by each individual term
- **[.firstTerms()](https://observablehq.com/@spencermountain/compromise-accessors)** - get the first word in each match
- **[.lastTerms()](https://observablehq.com/@spencermountain/compromise-accessors)** - get the end word in each match
- **[.sentences()](https://observablehq.com/@spencermountain/compromise-accessors)** - get the whole sentence for each match
- **[.termList()](https://observablehq.com/@spencermountain/compromise-accessors)** - return a flat list of all Term objects in match
- **[.groups('')](https://observablehq.com/@spencermountain/compromise-accessors)** - grab any named capture-groups from a match

##### Match

_(all match methods use the [match-syntax](https://docs.compromise.cool/compromise-match-syntax).)_

- **[.match('')](https://observablehq.com/@spencermountain/compromise-match)** - return a new Doc, with this one as a parent
- **[.not('')](https://observablehq.com/@spencermountain/compromise-match)** - return all results except for this
- **[.matchOne('')](https://observablehq.com/@spencermountain/compromise-match)** - return only the first match
- **[.if('')](https://observablehq.com/@spencermountain/compromise-match)** - return each current phrase, only if it contains this match ('only')
- **[.ifNo('')](https://observablehq.com/@spencermountain/compromise-match)** - Filter-out any current phrases that have this match ('notIf')
- **[.has('')](https://observablehq.com/@spencermountain/compromise-match)** - Return a boolean if this match exists
- **[.lookBehind('')](https://observablehq.com/@spencermountain/compromise-match)** - search through earlier terms, in the sentence
- **[.lookAhead('')](https://observablehq.com/@spencermountain/compromise-match)** - search through following terms, in the sentence
- **[.before('')](https://observablehq.com/@spencermountain/compromise-match)** - return all terms before a match, in each phrase
- **[.after('')](https://observablehq.com/@spencermountain/compromise-match)** - return all terms after a match, in each phrase
- **[.lookup([])](https://observablehq.com/@spencermountain/compromise-match)** - quick find for an array of string matches

##### Case

- **[.toLowerCase()](https://observablehq.com/@spencermountain/compromise-case)** - turn every letter of every term to lower-cse
- **[.toUpperCase()](https://observablehq.com/@spencermountain/compromise-case)** - turn every letter of every term to upper case
- **[.toTitleCase()](https://observablehq.com/@spencermountain/compromise-case)** - upper-case the first letter of each term
- **[.toCamelCase()](https://observablehq.com/@spencermountain/compromise-case)** - remove whitespace and title-case each term

##### Whitespace

- **[.pre('')](https://observablehq.com/@spencermountain/compromise-whitespace)** - add this punctuation or whitespace before each match
- **[.post('')](https://observablehq.com/@spencermountain/compromise-whitespace)** - add this punctuation or whitespace after each match
- **[.trim()](https://observablehq.com/@spencermountain/compromise-whitespace)** - remove start and end whitespace
- **[.hyphenate()](https://observablehq.com/@spencermountain/compromise-whitespace)** - connect words with hyphen, and remove whitespace
- **[.dehyphenate()](https://observablehq.com/@spencermountain/compromise-whitespace)** - remove hyphens between words, and set whitespace
- **[.toQuotations()](https://observablehq.com/@spencermountain/compromise-whitespace)** - add quotation marks around these matches
- **[.toParentheses()](https://observablehq.com/@spencermountain/compromise-whitespace)** - add brackets around these matches

##### Tag

- **[.tag('')](https://observablehq.com/@spencermountain/compromise-tagger)** - Give all terms the given tag
- **[.tagSafe('')](https://observablehq.com/@spencermountain/compromise-tagger)** - Only apply tag to terms if it is consistent with current tags
- **[.unTag('')](https://observablehq.com/@spencermountain/compromise-tagger)** - Remove this term from the given terms
- **[.canBe('')](https://observablehq.com/@spencermountain/compromise-tagger)** - return only the terms that can be this tag

##### Loops

- **[.map(fn)](https://observablehq.com/@spencermountain/compromise-loops)** - run each phrase through a function, and create a new document
- **[.forEach(fn)](https://observablehq.com/@spencermountain/compromise-loops)** - run a function on each phrase, as an individual document
- **[.filter(fn)](https://observablehq.com/@spencermountain/compromise-loops)** - return only the phrases that return true
- **[.find(fn)](https://observablehq.com/@spencermountain/compromise-loops)** - return a document with only the first phrase that matches
- **[.some(fn)](https://observablehq.com/@spencermountain/compromise-loops)** - return true or false if there is one matching phrase
- **[.random(fn)](https://observablehq.com/@spencermountain/compromise-loops)** - sample a subset of the results

##### Insert

- **[.replace(match, replace)](https://observablehq.com/@spencermountain/compromise-insert)** - search and replace match with new content
- **[.replaceWith(replace)](https://observablehq.com/@spencermountain/compromise-insert)** - substitute-in new text
- **[.delete()](https://observablehq.com/@spencermountain/compromise-insert)** - fully remove these terms from the document
- **[.append(str)](https://observablehq.com/@spencermountain/compromise-insert)** - add these new terms to the end (insertAfter)
- **[.prepend(str)](https://observablehq.com/@spencermountain/compromise-insert)** - add these new terms to the front (insertBefore)
- **[.concat()](https://observablehq.com/@spencermountain/compromise-insert)** - add these new things to the end

##### Transform

- **[.sort('method')](https://observablehq.com/@spencermountain/compromise-sorting)** - re-arrange the order of the matches (in place)
- **[.reverse()](https://observablehq.com/@spencermountain/compromise-sorting)** - reverse the order of the matches, but not the words
- **[.normalize({})](https://observablehq.com/@spencermountain/compromise-normalization)** - clean-up the text in various ways
- **[.unique()](https://observablehq.com/@spencermountain/compromise-sorting)** - remove any duplicate matches
- **[.split('')](https://observablehq.com/@spencermountain/compromise-split)** - return a Document with three parts for every match ('splitOn')
- **[.splitBefore('')](https://observablehq.com/@spencermountain/compromise-split)** - partition a phrase before each matching segment
- **[.splitAfter('')](https://observablehq.com/@spencermountain/compromise-split)** - partition a phrase after each matching segment
- **[.segment({})](https://observablehq.com/@spencermountain/compromise-split)** - split a document into labeled sections
- **[.join('')](https://observablehq.com/@spencermountain/compromise-split)** - make all phrases into one phrase

##### Output

- **[.text('method')](https://observablehq.com/@spencermountain/compromise-text)** - return the document as text
- **[.json({})](https://observablehq.com/@spencermountain/compromise-json)** - pull out desired metadata from the document
- **[.out('array|offset|terms')](https://observablehq.com/@spencermountain/compromise-output)** - some named output formats (deprecated)
- **[.debug()](https://observablehq.com/@spencermountain/compromise-output)** - pretty-print the current document and its tags

##### Selections

- **[.clauses()](https://observablehq.com/@spencermountain/compromise-selections)** - split-up sentences into multi-term phrases
- **[.hyphenated()](https://observablehq.com/@spencermountain/compromise-selections)** - all terms connected with a hyphen or dash like `'wash-out'`
- **[.phoneNumbers()](https://observablehq.com/@spencermountain/compromise-selections)** - things like `'(939) 555-0113'`
- **[.money()](https://observablehq.com/@spencermountain/compromise-values)** - things like `'$2.50'`
- **[.hashTags()](https://observablehq.com/@spencermountain/compromise-selections)** - things like `'#nlp'`
- **[.emails()](https://observablehq.com/@spencermountain/compromise-selections)** - things like `'hi@compromise.cool'`
- **[.emoticons()](https://observablehq.com/@spencermountain/compromise-selections)** - things like `:)`
- **[.emojis()](https://observablehq.com/@spencermountain/compromise-selections)** - things like `💋`
- **[.atMentions()](https://observablehq.com/@spencermountain/compromise-selections)** - things like `'@nlp_compromise'`
- **[.urls()](https://observablehq.com/@spencermountain/compromise-selections)** - things like `'compromise.cool'`
- **[.adverbs()](https://observablehq.com/@spencermountain/compromise-selections)** - things like `'quickly'`
- **[.pronouns()](https://observablehq.com/@spencermountain/compromise-selections)** - things like `'he'`
- **[.conjunctions()](https://observablehq.com/@spencermountain/compromise-selections)** - things like `'but'`
- **[.prepositions()](https://observablehq.com/@spencermountain/compromise-selections)** - things like `'of'`
- **[.abbreviations()](https://observablehq.com/@spencermountain/compromise-selections)** - things like `'Mrs.'`
- **[.people()](https://observablehq.com/@spencermountain/topics-named-entity-recognition)** - names like 'John F. Kennedy'
- **[.places()](https://observablehq.com/@spencermountain/topics-named-entity-recognition)** - like 'Paris, France'
- **[.organizations()](https://observablehq.com/@spencermountain/topics-named-entity-recognition)** - like 'Google, Inc'
- **[.topics()](https://observablehq.com/@spencermountain/topics-named-entity-recognition)** - `people()` + `places()` + `organizations

##### Subsets

- **[.contractions()](https://observablehq.com/@spencermountain/compromise-contractions)** - things like "didn't"
- **[.contractions().expand()](https://observablehq.com/@spencermountain/compromise-contractions)** - things like "didn't"
- **[.contract()](https://observablehq.com/@spencermountain/compromise-contractions)** - `"she would"` -> `"she'd"`
- **[.parentheses()](https://observablehq.com/@spencermountain/compromise-selections)** - return anything inside (parentheses)
- **[.possessives()](https://observablehq.com/@spencermountain/compromise-selections)** - things like `"Spencer's"`
- **[.quotations()](https://observablehq.com/@spencermountain/compromise-selections)** - return any terms inside quotation marks
- **[.acronyms()](https://observablehq.com/@spencermountain/compromise-selections)** - things like `'FBI'`
- **[.lists()](https://observablehq.com/@spencermountain/compromise-lists)** - things like `'eats, shoots, and leaves'`
  - **[.lists().items()](https://observablehq.com/@spencermountain/compromise-lists)** - return the partitioned things in the list
  - **[.lists().add()](https://observablehq.com/@spencermountain/compromise-lists)** - put a new item in the list
- **[.nouns()](https://observablehq.com/@spencermountain/nouns)** - return any subsequent terms tagged as a Noun
  - **[.nouns().json()](https://observablehq.com/@spencermountain/nouns)** - overloaded output with noun metadata
  - **[.nouns().adjectives()](https://observablehq.com/@spencermountain/nouns)** - get any adjectives describing this noun
  - **[.nouns().toPlural()](https://observablehq.com/@spencermountain/nouns)** - `'football captain' → 'football captains'`
  - **[.nouns().toSingular()](https://observablehq.com/@spencermountain/nouns)** - `'turnovers' → 'turnover'`
  - **[.nouns().isPlural()](https://observablehq.com/@spencermountain/nouns)** - return only plural nouns
  - **[.nouns().isSingular()](https://observablehq.com/@spencermountain/nouns)** - return only singular nouns
  - **[.nouns().hasPlural()](https://observablehq.com/@spencermountain/nouns)** - return only nouns that _can be_ inflected as plural
  - **[.nouns().toPossessive()](https://observablehq.com/@spencermountain/nouns)** - add a `'s` to the end, in a safe manner.
- **[.verbs()](https://observablehq.com/@spencermountain/verbs)** - return any subsequent terms tagged as a Verb
  - **[.verbs().json()](https://observablehq.com/@spencermountain/verbs)** - overloaded output with verb metadata
  - **[.verbs().conjugate()](https://observablehq.com/@spencermountain/verbs)** - return all forms of these verbs
  - **[.verbs().toPastTense()](https://observablehq.com/@spencermountain/verbs)** - `'will go' → 'went'`
  - **[.verbs().toPresentTense()](https://observablehq.com/@spencermountain/verbs)** - `'walked' → 'walks'`
  - **[.verbs().toFutureTense()](https://observablehq.com/@spencermountain/verbs)** - `'walked' → 'will walk'`
  - **[.verbs().toInfinitive()](https://observablehq.com/@spencermountain/verbs)** - `'walks' → 'walk'`
  - **[.verbs().toGerund()](https://observablehq.com/@spencermountain/verbs)** - `'walks' → 'walking'`
  - **[.verbs().toNegative()](https://observablehq.com/@spencermountain/verbs)** - `'went' → 'did not go'`
  - **[.verbs().toPositive()](https://observablehq.com/@spencermountain/verbs)** - `"didn't study" → 'studied'`
  - **[.verbs().isNegative()](https://observablehq.com/@spencermountain/verbs)** - return verbs with 'not'
  - **[.verbs().isPositive()](https://observablehq.com/@spencermountain/verbs)** - only verbs without 'not'
  - **[.verbs().isPlural()](https://observablehq.com/@spencermountain/verbs)** - return plural verbs like 'we walk'
  - **[.verbs().isSingular()](https://observablehq.com/@spencermountain/verbs)** - return singular verbs like 'spencer walks'
  - **[.verbs().adverbs()](https://observablehq.com/@spencermountain/verbs)** - return the adverbs describing this verb.

<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221824-09809d80-ffb8-11e9-9ef0-6ed3574b0ce8.png"/>
</div>

### Plugins:

These are some helpful extensions:

##### Adjectives

`npm install compromise-adjectives`

- **[.adjectives()](https://observablehq.com/@spencermountain/compromise-adjectives)** - like `quick`
  - **[.adjectives().json()](https://observablehq.com/@spencermountain/compromise-adjectives)** - overloaded output with adjective metadata
  - **[.adjectives().conjugate()](https://observablehq.com/@spencermountain/compromise-adjectives)** - return all conjugated forms of this adjective
  - **[.adjectives().toSuperlative()](https://observablehq.com/@spencermountain/compromise-adjectives)** - convert `quick` to `quickest`
  - **[.adjectives().toComparative()](https://observablehq.com/@spencermountain/compromise-adjectives)** - convert `quick` to `quicker`
  - **[.adjectives().toAdverb()](https://observablehq.com/@spencermountain/compromise-adjectives)** - convert `quick` to `quickly`
  - **[.adjectives().toVerb()](https://observablehq.com/@spencermountain/compromise-adjectives)** - convert `quick` to `quicken`
  - **[.adjectives().toNoun()](https://observablehq.com/@spencermountain/compromise-adjectives)** - convert `quick` to `quickness`

##### Dates

`npm install compromise-dates`

- **[.dates()](https://observablehq.com/@spencermountain/compromise-dates)** - find dates like `June 8th` or `03/03/18`
  - **[.dates().json()](https://observablehq.com/@spencermountain/compromise-dates)** - overloaded output with date metadata
  - **[.dates().format('')](https://observablehq.com/@spencermountain/compromise-dates)** - convert the dates to specific formats
  - **[.dates().toShortForm()](https://observablehq.com/@spencermountain/compromise-dates)** - convert 'Wednesday' to 'Wed', etc
  - **[.dates().toLongForm()](https://observablehq.com/@spencermountain/compromise-dates)** - convert 'Feb' to 'February', etc

##### Numbers

`npm install compromise-numbers`

- **[.numbers()](https://observablehq.com/@spencermountain/compromise-values)** - grab all written and numeric values
  - **[.numbers().json()](https://observablehq.com/@spencermountain/compromise-values)** - overloaded output with number metadata
  - **[.numbers().units()](https://observablehq.com/@spencermountain/compromise-values)** - grab 'kilos' from `25 kilos'`
  - **[.numbers().fractions()](https://observablehq.com/@spencermountain/compromise-values)** - things like `1/3rd`
  - **[.numbers().toText()](https://observablehq.com/@spencermountain/compromise-values)** - convert number to `five` or `fifth`
  - **[.numbers().toNumber()](https://observablehq.com/@spencermountain/compromise-values)** - convert number to `5` or `5th`
  - **[.numbers().toOrdinal()](https://observablehq.com/@spencermountain/compromise-values)** - convert number to `fifth` or `5th`
  - **[.numbers().toCardinal()](https://observablehq.com/@spencermountain/compromise-values)** - convert number to `five` or `5`
  - **[.numbers().set(n)](https://observablehq.com/@spencermountain/compromise-values)** - set number to n
  - **[.numbers().add(n)](https://observablehq.com/@spencermountain/compromise-values)** - increase number by n
  - **[.numbers().subtract(n)](https://observablehq.com/@spencermountain/compromise-values)** - decrease number by n
  - **[.numbers().increment()](https://observablehq.com/@spencermountain/compromise-values)** - increase number by 1
  - **[.numbers().decrement()](https://observablehq.com/@spencermountain/compromise-values)** - decrease number by 1
  - **[.numbers().isEqual(n)](https://observablehq.com/@spencermountain/compromise-values)** - return numbers with this value
  - **[.numbers().greaterThan(min)](https://observablehq.com/@spencermountain/compromise-values)** - return numbers bigger than n
  - **[.numbers().lessThan(max)](https://observablehq.com/@spencermountain/compromise-values)** - return numbers smaller than n
  - **[.numbers().between(min, max)](https://observablehq.com/@spencermountain/compromise-values)** - return numbers between min and max
  - **[.numbers().isOrdinal()](https://observablehq.com/@spencermountain/compromise-values)** - return only ordinal numbers
  - **[.numbers().isCardinal()](https://observablehq.com/@spencermountain/compromise-values)** - return only cardinal numbers
  - **[.numbers().toLocaleString()](https://observablehq.com/@spencermountain/compromise-values)** - add commas, or nicer formatting for numbers

##### Export

`npm install compromise-export`

- **[.export()](https://observablehq.com/@spencermountain/compromise-export)** - store a parsed document for later use
- **[nlp.load()](https://observablehq.com/@spencermountain/compromise-export)** - re-generate a Doc object from .export() results

##### Html

`npm install compromise-html`

- **[.html({})](https://observablehq.com/@spencermountain/compromise-html)** - generate sanitized html from the document

##### Hash

`npm install compromise-hash`

- **[.hash()](https://observablehq.com/@spencermountain/compromise-hash)** - generate an md5 hash from the document+tags
- **[.isEqual(doc)](https://observablehq.com/@spencermountain/compromise-hash)** - compare the hash of two documents for semantic-equality

##### Keypress

`npm install compromise-keypress`

- **[nlp.keypress('')](https://observablehq.com/@spencermountain/compromise-keypress)** - generate an md5 hash from the document+tags
- **[nlp.clear('')](https://observablehq.com/@spencermountain/compromise-keypress)** - clean-up any cached sentences from memory

##### Ngrams

`npm install compromise-ngrams`

- **[.ngrams({})](https://observablehq.com/@spencermountain/compromise-ngram)** - list all repeating sub-phrases, by word-count
- **[.unigrams()](https://observablehq.com/@spencermountain/compromise-ngram)** - n-grams with one word
- **[.bigrams()](https://observablehq.com/@spencermountain/compromise-ngram)** - n-grams with two words
- **[.trigrams()](https://observablehq.com/@spencermountain/compromise-ngram)** - n-grams with three words
- **[.startgrams()](https://observablehq.com/@spencermountain/compromise-ngram)** - n-grams including the first term of a phrase
- **[.endgrams()](https://observablehq.com/@spencermountain/compromise-ngram)** - n-grams including the last term of a phrase
- **[.edgegrams()](https://observablehq.com/@spencermountain/compromise-ngram)** - n-grams including the first or last term of a phrase

##### Paragraphs

`npm install compromise-paragraphs`
this plugin creates a wrapper around the default sentence objects.

- **[.paragraphs()](https://observablehq.com/@spencermountain/compromise-paragraphs)** - return groups of sentences
  - **[.paragraphs().json()](https://observablehq.com/@spencermountain/compromise-paragraphs)** - output metadata for each paragraph
  - **[.paragraphs().sentences()](https://observablehq.com/@spencermountain/compromise-paragraphs)** - go back to a regular Doc object
  - **[.paragraphs().terms()](https://observablehq.com/@spencermountain/compromise-paragraphs)** - return all individual terms
  - **[.paragraphs().eq()](https://observablehq.com/@spencermountain/compromise-paragraphs)** - get the nth paragraph
  - **[.paragraphs().first()](https://observablehq.com/@spencermountain/compromise-paragraphs)** - get the first n paragraphs
  - **[.paragraphs().last()](https://observablehq.com/@spencermountain/compromise-paragraphs)** - get the last n paragraphs
  - **[.paragraphs().match()](https://observablehq.com/@spencermountain/compromise-paragraphs)** -
  - **[.paragraphs().not()](https://observablehq.com/@spencermountain/compromise-paragraphs)** -
  - **[.paragraphs().if()](https://observablehq.com/@spencermountain/compromise-paragraphs)** -
  - **[.paragraphs().ifNo()](https://observablehq.com/@spencermountain/compromise-paragraphs)** -
  - **[.paragraphs().has()](https://observablehq.com/@spencermountain/compromise-paragraphs)** -
  - **[.paragraphs().forEach()](https://observablehq.com/@spencermountain/compromise-paragraphs)** -
  - **[.paragraphs().map()](https://observablehq.com/@spencermountain/compromise-paragraphs)** -
  - **[.paragraphs().filter()](https://observablehq.com/@spencermountain/compromise-paragraphs)** -

##### Sentences

`npm install compromise-sentences`

- **[.sentences()](https://observablehq.com/@spencermountain/compromise-sentences)** - return a sentence class with additional methods
  - **[.sentences().json()](https://observablehq.com/@spencermountain/compromise-sentences)** - overloaded output with sentence metadata
  - **[.sentences().subjects()](https://observablehq.com/@spencermountain/compromise-sentences)** - return the main noun of each sentence
  - **[.sentences().toPastTense()](https://observablehq.com/@spencermountain/compromise-sentences)** - `he walks` -> `he walked`
  - **[.sentences().toPresentTense()](https://observablehq.com/@spencermountain/compromise-sentences)** - `he walked` -> `he walks`
  - **[.sentences().toFutureTense()](https://observablehq.com/@spencermountain/compromise-sentences)** -- `he walks` -> `he will walk`
  - **[.sentences().toNegative()](https://observablehq.com/@spencermountain/compromise-sentences)** - - `he walks` -> `he didn't walk`
  - **[.sentences().toPositive()](https://observablehq.com/@spencermountain/compromise-sentences)** - `he doesn't walk` -> `he walks`
  - **[.sentences().isPassive()](https://observablehq.com/@spencermountain/compromise-sentences)** - return only sentences with a passive-voice
  - **[.sentences().isQuestion()](https://observablehq.com/@spencermountain/compromise-sentences)** - return questions with a `?`
  - **[.sentences().isExclamation()](https://observablehq.com/@spencermountain/compromise-sentences)** - return sentences with a `!`
  - **[.sentences().isStatement()](https://observablehq.com/@spencermountain/compromise-sentences)** - return sentences without `?` or `!`
  - **[.sentences().prepend()](https://observablehq.com/@spencermountain/compromise-sentences)** - smarter prepend that repairs whitespace + titlecasing
  - **[.sentences().append()](https://observablehq.com/@spencermountain/compromise-sentences)** - smarter append that repairs sentence punctuation
  - **[.sentences().toExclamation()](https://observablehq.com/@spencermountain/compromise-sentences)** - end sentence with a `!`
  - **[.sentences().toQuestion()](https://observablehq.com/@spencermountain/compromise-sentences)** - end sentence with a `?`
  - **[.sentences().toStatement()](https://observablehq.com/@spencermountain/compromise-sentences)** - end sentence with a `.`
    <!-- - **[.sentences().toContinuous()](#)** - -->

##### Syllables

`npm install compromise-syllables`

- **[.syllables()](https://observablehq.com/@spencermountain/compromise-syllables)** - split each term by its typical pronounciation

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

### Typescript

Typescript support is still a work in progress. So far support for plugins has been mostly complete, and can be used to type-safely extend NLP.

```ts
import nlp from 'compromise'
import ngrams from 'compromise-ngrams'
import numbers from 'compromise-numbers'

// .extend() can be chained
const nlpEx  = nlp.extend(ngrams).extend(numbers)

nlpEx('This is type safe!').ngrams({ min: 1 })
nlpEx('This is type safe!').numbers()
```

#### Type-safe Plugins
The `.extend()` function returns an nlp type with updated Document and World types (Phrase, Term and Pool are not currently supported). While the global nlp also recieves the plugin from a runtime perspective; it's type will not be updated - this is a limitation of Typescript.

Typesafe plugins can be created by using the `nlp.Plugin` type:
```ts
interface myExtendedDoc {
  sayHello(): string
}

interface myExtendedWorld {
  hello: string
}

const myPlugin: nlp.Plugin<myExtendedDoc, myExtendedWorld> = (Doc, world) => {
  world.hello = 'Hello world!'

  Doc.prototype.sayHello = () => world.hello
}

const _nlp = nlp.extend(myPlugin)
const doc = _nlp('This is safe!')
doc.sayHello()
doc.world.hello = "Hello again!"

```

#### Known Issues

* `compromise_1.default is not a function` - This is a problem with your `tsconfig.json` it can be solved by adding `"esModuleInterop": true`. Make sure to run `tsc --init` when starting a new Typescript project.

### Docs:

##### Tutorials:

- **[Tutorial #1](https://docs.compromise.cool/tutorial-1)** - Input → output
- **[Tutorial #2](https://docs.compromise.cool/compromise-tutorial-2)** - Match & transform
- **[Tutorial #3](https://docs.compromise.cool/compromise-making-a-bot)** - Making a chat-bot
  <!-- * **[Tutorial #4]()**  -  Making a plugin -->

##### 3rd party:

- **[Geocoding Social Conversations with NLP and JavaScript](http://compromise.cool)** - by Microsoft
- **[Microservice Recipe](https://eventn.com/recipes/text-parsing-with-nlp-compromise)** - by Eventn
- **[Adventure Game Sentence Parsing with Compromise](https://killalldefects.com/2020/02/20/adventure-game-sentence-parsing-with-compromise/)
- **[Building Text-Based Games](https://killalldefects.com/2019/09/24/building-text-based-games-with-compromise-nlp/)** - by Matt Eland
- **[Fun with javascript in BigQuery](https://medium.com/@hoffa/new-in-bigquery-persistent-udfs-c9ea4100fd83#6e09)** - by Felipe Hoffa
- **[Natural Language Processing... in the Browser???](https://dev.to/charlesdlandau/natural-language-processing-in-the-browser-52hj)** - by Charles Landau

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
        See <a href="https://observablehq.com/@spencermountain/compromise-performance">here</a> for information about speed & performance, and
        <a href="https://observablehq.com/@spencermountain/compromise-justification">here</a> for project motivations
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
        Read <a href="https://observablehq.com/@spencermountain/compromise-quickstart">quick start</a> for running compromise in workers, mobile apps, and all sorts of funny environments.
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
        we do offer a [compromise-tokenize](./builds/compromise-tokenize.js) build, which has the POS-tagger pulled-out.
        <br/> 
        but otherwise, compromise isn't easily tree-shaken.
        <br/> 
        the tagging methods are competitive, and greedy, so it's not recommended to pull things out.
        <br/> 
        Note that without a full POS-tagging, the contraction-parser won't work perfectly. (<i>(spencer's cool)</i> vs. <i>(spencer's house)</i>)
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
- &nbsp; **[Prose](https://github.com/jdkato/prose/)** - quick tagger in Go by Joseph Kato

<img height="25px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

<b>MIT</b>
