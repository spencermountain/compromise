[compromise](https://github.com/spencermountain/compromise) is a modest library that does natural-language processing in javascript.

it was built to make searching and transforming human-text easy and playful.

**v12** is the biggest (and most-proud) release in it's 8 year history. It involves 500 commits over 11 months of work.

You can read about some of the design-decisions for this update [here](https://medium.com/@spencermountain/compromise-in-2019-e7d0ca703320).

---

Although the release is a near-complete rewrite, most compromise v11 scripts will continue to work in v12.

There are many subtle changes, and this document is intended as a upgrade guide.

---

### Big wins:

- v12 is considerably faster. In most cases it is 50% faster than v11.

- v12 is considerably smaller. It is **170kb**, instead of 235kb. (~40% smaller)

- pass-by-reference issues are gone. Most github issues will close.

- we have a new plugin scheme that makes customization simpler

- `.export()`, `.import()` to serialize and compress a document object

- added a new match-syntax feature - `@termMethod` to query non-tag info

- json and text outputs can be configured directly now

- paragraph support

- better unicode support

- moved all documentation to [observablehq](https://observablehq.com/collection/@spencermountain/nlp-compromise)

- cleaned-up internal handling of whitespace/punctuation

---

### Breaking changes:

#### Removed methods:

- **.getPunctuation()**- use `.pre()` or `.post()`
- **.setPunctuation()** - use `.pre(str)` or `.post(str)`
- **.whitespace()** - use `.json({terms:{whitespace:true}})`
- **.flatten()** - use `.join()`
- **.lump()** - this was an anti-pattern.
- **.insertAt()** - using term indexes is not fun!
- **.reduce()** - not sure if this ever even worked?
- **.normal()** - use `.text('normal')`
- **nouns().articles()** - use `nouns().json()`

#### Removed tags:

the v12 feature - `@termMethod` allows you to query things that are not in the term's tags. This allows us to clear-up the following tags:

- **#Comma** - `@hasComma`
- **#Quotation** - `.quotations()` has been improved
- **#ClauseEnd** - `.clauses()` has been heavily-improved
- **#NumberRange** - the `compromise-numbers` plugin cleans these things up.

#### Moved methods:

our new plugin scheme allows us to easily add all sorts of behaviour to compromise classes. This has allowed us to separate some functionality into plugins. These are very easy to include (promise!):

- **.values()** - number parsing has been moved to [compromise-numbers](https://github.com/spencermountain/compromise/tree/master/plugins/numbers)

- **.ngrams()** - ngram functionality has been moved to [compromise-ngrams](https://github.com/spencermountain/compromise/tree/master/plugins/ngrams)

- **.people()**, **.places()**, **.organizations()**, **.topics()** - these have been moved to [compromise-entities](https://github.com/spencermountain/compromise/tree/master/plugins/entities)

- **.dates()** - date parsing has been moved to [compromise-dates](https://github.com/spencermountain/compromise/tree/master/plugins/dates)

- **.adjectives()** - adjective conjugation has been moved to [compromise-adjectives](https://github.com/spencermountain/compromise/tree/master/plugins/adjectives)

- **.contractions()** - now returns only contractions, and not _possible-contractions_. `.conctract()` is now a stand-alone method.

- **.out('html')** - html output has been moved to [compromise-output](https://github.com/spencermountain/compromise/tree/master/plugins/output)

These plugins can just be applied like this:

```js
const nlp = require('compromise')
nlp.extend(require('compromise-plugin-foo'))
```

Once the plugin is applied, things should work just as normal.

#### Misc breaking

- `.map()`, `.forEach()`, `.filter()`, `.some()` all return full **Doc** objects of length 1 (instead of an undocumented internal object)

- results of `.canbe()` are more like `.match()`

- more consistent behaviour for `.replace('foo [bar]', 'baz')`

- `.numbers()` results no longer include Units, by default. Get them with `.numbers().units()`
  
- `.verbs()` results no longer include leading/trailing Adverbs. Get them with `.verbs().adverbs()`

- the internal compromise api has changed considerably. If you were 'reaching in' to the internal objects in v11, you'll see many changes.

- removed no-longer-needed `prefix_` and `_suffix` operators from match syntax

- `.toCamelCase()` no-longer capitalizes char[0]. Run `.toCamelCase().toTitleCase()` for this.


### non-breaking changes:

#### New Methods:

- `.reverse()` -
- `.unique()` - remove duplicates using 'root'
  <!-- - `.wordcount()` -  -->
- `.cache()` - speed-up matches and lookups
- `.uncache()` - manually disable the cache
- `.join()` - search between sentences, for example
- `.lookAhead()` - match through the terms before your current match
- `.lookBehind()` -match through the terms after your current match
- `.lists()` - find all comma-seperated natural-language lists
- `.matchOne()` - return the first .match()
- `.segment()` - split a document according to a given label
- `.export()` - serialize and compress the document for saving/moving

#### New Constructor methods

- .extend() - change any internal compromise data
- .load() - create a new document from `.export()` results

### Misc new features

- limited AND support in match syntax: `.match('(foo && bar)')`
- `.hash()` via [compromise-output](https://github.com/spencermountain/compromise/tree/master/plugins/output)
- `.syllables()` via [compromise-syllables](https://github.com/spencermountain/compromise/tree/master/plugins/syllables)
- `.paragraphs()` via [compromise-paragraphs](https://github.com/spencermountain/compromise/tree/master/plugins/paragraphs)
- improved handling of slashed terms - like `he is/was fun.`
