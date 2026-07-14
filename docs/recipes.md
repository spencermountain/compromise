# Compromise recipes

Copy-paste solutions for common tasks. Every snippet is real, verified output.
Read [concepts.md](concepts.md) first if you haven't — especially the **mutability** rule,
which trips up most of these.

```js
import nlp from 'compromise'
```

## The mutability rule (read this)

Transform methods change the underlying document **in place**, and the View they return is the
*selection*, not the whole document. So read the result from the original `doc`:

```js
let doc = nlp('I walk to work')
doc.verbs().toPastTense()        // mutates doc; the returned view is just "walked"
doc.text()                       // 'I walked to work'   ✅ read from doc

// ⚠️ common mistake — .text() here is only the matched selection:
nlp('I walk to work').verbs().toPastTense().text()   // 'walked work'  (not the whole sentence)
```

To transform a copy and leave the original alone, use `.clone()`:

```js
let doc = nlp('I walk')
let past = doc.clone().verbs().toPastTense().text()   // 'walked'
doc.text()                                            // 'I walk'  (untouched)
```

## Extract named entities (people, places, orgs)

```js
let doc = nlp('Mary met Dr. John Smith in Paris.')
doc.people().out('array')        // ['Mary', 'Dr. John Smith']
doc.places().out('array')        // ['Paris.']
nlp('Google and Mary went to Paris.').topics().out('array')  // ['Google', 'Paris.', 'Mary']
```
`.topics()` = people + places + organizations.

## Change verb tense

```js
let doc = nlp('I walk to work')
doc.verbs().toPastTense();   doc.text()   // 'I walked to work'
doc.verbs().toFutureTense(); doc.text()   // 'I will walk to work'
```
Tense methods also exist on `.sentences()` for whole-sentence rewrites.

## Find & replace

```js
let doc = nlp('I love cats')
doc.replace('cats', 'dogs')      // search-and-replace by pattern
doc.text()                       // 'I love dogs'

// replace whatever a selection matched:
let d2 = nlp('the cat sat')
d2.match('#Noun').replaceWith('dog')
d2.text()                        // 'the dog sat'
```

## Redact / anonymise PII

```js
let doc = nlp('Mary called John')
doc.people().replaceWith('███')
doc.text()                       // '███ called ███'
```
There is also a built-in `.redact()` that removes **people, places, emails, and phone numbers** at
once. Note it does **not** currently redact organizations — remove those yourself with
`doc.organizations().replaceWith('███')` if you need to.

## Pluralize / singularize nouns

```js
let doc = nlp('one good dog')
doc.nouns().toPlural();   doc.text()   // 'one good dogs'

let d2 = nlp('three turnovers')
d2.nouns().toSingular();  d2.text()    // 'three turnover'
```

## Work with numbers

```js
nlp('it cost twelve dollars').numbers().get()           // [12]
nlp('five hundred').numbers().toNumber().text()         // '500'   (words → digits)
nlp('it is 5 km').numbers().toText().text()             // 'five'  (digits → words)
```
Numbers also support `.greaterThan()`, `.lessThan()`, `.between()`, `.add()`, `.subtract()`.
Money and fractions have their own selections (`.money()`, `.fractions()`, `.percentages()`).

## Match a pattern and pull out a piece

```js
let doc = nlp('the price of milk is high')
doc.match('price of [<thing>.]').groups('thing').text()   // 'milk'
```
See [match-syntax.md](match-syntax.md) for the full pattern language and capture groups.

## Test whether text contains something (chat-bot style)

```js
nlp('the deal is closed').has('#Determiner #Noun')   // true
nlp('I love cats').has('love #Plural')               // true
```
`.has()` returns a boolean and never mutates — ideal for routing/intent checks.

## Filter sentences

```js
nlp('I am here. Are you ok?').questions().out('array')        // ['Are you ok?']
nlp('I like cats. Dogs are loud.').sentences().if('#Plural').out('array')
// ['I like cats.', 'Dogs are loud.']   — keep only sentences containing a plural
```

## Negate a sentence

```js
let doc = nlp('he is happy')
doc.sentences().toNegative()
doc.text()                       // 'he is not happy'
```

## Expand contractions

```js
let doc = nlp("she isn't here")
doc.contractions().expand()
doc.text()                       // 'she is not here'
```

## Normalize messy text

```js
nlp('I  LOVE   Café!!').normalize().text()   // 'I LOVE Cafe!'
```
`.normalize({ ... })` takes options for whitespace, case, unicode, punctuation, contractions, etc.

## Get structured data out

```js
nlp('big cats').json()[0].terms.map(t => t.text)   // ['big', 'cats']
nlp('hi there').json({ offset: true })[0].offset   // { index: 0, start: 0, length: 8 }
```
`.json()` accepts flags to include `offset`, `tags`, `normal`, `reduced`, and more — see [api.md](api.md).

## Teach it new words

At parse time, with a lexicon object:

```js
nlp('kermit waved', { kermit: 'FirstName' }).people().out('array')   // ['kermit']
```

Globally, with `nlp.addWords()` (use a valid [tag](tags.md)):

```js
nlp.addWords({ frodo: 'FirstName', gandalf: 'FirstName' })
nlp('frodo met gandalf').people().out('array')   // ['frodo', 'gandalf']
```

## Write a plugin (add your own method)

```js
nlp.plugin({
  // add words to the lexicon
  words: { kermit: 'FirstName' },
  // add new tags to the tagset graph
  tags: { Muppet: { isA: 'Person' } },
  // add new chainable methods
  api: (View) => {
    View.prototype.exclaim = function () {
      return this.post('!')   // add '!' after each match
    }
  },
})

let doc = nlp('hello there')
doc.match('there').exclaim()
doc.text()                       // 'hello there!'
```

See [concepts.md](concepts.md) for `.extend()` and the full plugin shape, and the
[`plugins/`](../plugins) folder for real examples (dates, stats, wikipedia, …).

## When `.match()` returns nothing

1. Check the tag is real — [tags.md](tags.md). `#Name`, `#Location`, `#Adj` are not tags.
2. Remember matches don't cross sentence boundaries.
3. Use `doc.debug()` to print how each word was actually tagged.
4. Exact words match the literal word; use `{root}` to match all conjugations.
