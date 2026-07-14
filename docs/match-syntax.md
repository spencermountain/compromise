# Compromise match-syntax

The mini-language used by `.match()`, `.has()`, `.if()`, `.before()`, `.replace()`, and friends.
It is **not** regular expressions — it matches whole *terms* (words), not characters.

Every example below is real, verified output.

```js
nlp('the cat sat down').match('#Determiner #Noun').text()
// 'the cat'
```

## Quick reference

| Token | Means | Example pattern | Matches |
|---|---|---|---|
| `word` | exact word (case-insensitive, lemma-aware) | `sat` | "sat" |
| `#Tag` | a part-of-speech [tag](tags.md) | `#Person` | "John" |
| `.` | exactly one of any term | `the . sat` | "the cat sat" |
| `*` | zero or more of any term (greedy) | `the * sat` | "the cat quickly sat" |
| `(a\|b)` | one of these options (OR) | `(cat\|dog)` | "cat" or "dog" |
| `(a && #Tag)` | term matches **both** conditions (AND) | `(cool && #Adjective)` | "cool" (only if tagged Adjective) |
| `word?` | optional term (zero or one) | `the big? cat` | "the cat" *and* "the big cat" |
| `+` | one or more of the previous (greedy) | `#Adjective+` | "big red" |
| `term{m,n}` | between m and n of the previous | `.{2,3}` | 2–3 of any term |
| `term{n}` | exactly n | `.{2}` | exactly 2 terms |
| `!` | negate — term is anything *except* this | `the !#Verb` | "the cat" (not "the runs") |
| `[ ]` | capture group (see below) | `[#Person+]` | captures the people |
| `[<name> ]` | **named** capture group | `[<who>#Person+]` | group named "who" |
| `^` | must be first term in the sentence | `^the` | leading "the" |
| `$` | must be last term in the sentence | `sat$` | trailing "sat" |
| `~word~` | fuzzy match (typos / near-spellings) | `~organization~` | "organisation" |
| `{root}` | match by root/lemma form | `{walk}` | "walk", "walks", "walked", "walking" |
| `{root/pos}` | root form, restricted to a part-of-speech | `{walk/verb}` | "walks" as a verb (not the noun) |
| `<Chunk>` | a noun-phrase/verb-phrase chunk | `<Noun>` | "the cat" |
| `@method` | a term-method predicate | `@isTitleCase` | title-cased terms |

Flags combine: `#Noun+?` (optional, greedy nouns), `^[<x>.]` (capture the first term), etc.

## Details and examples

### Exact words

```js
nlp('we walked to work').has('walked')          // true
nlp('we walked to work').match('walk').text()   // '' — exact word, not lemma
```
Use `{walk}` (root form) if you want all conjugations — see below.

### Tags — `#Tag`

The most useful token. Match by part-of-speech instead of literal word. The full, valid tag
list is in [tags.md](tags.md). Tags are hierarchical: `#FirstName` is also a `#Person` is also a `#Noun`.

```js
nlp('the cat sat').match('#Noun').text()                  // 'cat'
nlp('John Smith left').match('[<who>#Person+]').groups('who').text()  // 'john smith'
```

> ⚠️ Invalid tag names match **nothing silently**. `#Name`, `#Subject`, `#Adj`, `#Place` are easy
> mistakes — check [tags.md](tags.md). (`#Place` *is* valid; `#Location` is not.)

### Wildcards — `.` and `*`

- `.` is exactly one term. `*` is any number of terms (including zero) and is greedy.

```js
nlp('the cat sat').match('the . sat').text()            // 'the cat sat'
nlp('the cat quickly sat').match('the * sat').text()    // 'the cat quickly sat'
```

### Options — `(a|b)` and `(a && b)`

```js
nlp('i like red and blue').match('(red|blue)').out('array')   // ['red','blue']
nlp('a cool cat').match('(cool && #Adjective)').text()        // 'cool'
nlp('a nice gift today').match('(#Noun && gift)').text()      // 'gift'
```
`&&` requires the term to satisfy **all** conditions — useful to disambiguate one word from another
part-of-speech (match "gift" only where it is tagged a `#Noun`).

### Optional — `?`

```js
nlp('the car').match('the big? car').text()         // 'the car'
nlp('the big car').match('the big? car').text()     // 'the big car'
```

### Repetition — `+`, `*`, `{m,n}`

```js
nlp('the big red car').match('#Adjective+').text()  // 'big red'
nlp('a b c d').match('.{2,3}').text()               // 'a b c'
```
- `{n}` exactly n, `{m,n}` m-to-n, `{m,}` m-or-more, `{,n}` up-to-n.

### Negation — `!`

```js
nlp('the cat sat').match('the !#Verb').text()   // 'the cat'  (cat is not a Verb)
```

### Anchors — `^` and `$`

Anchored to the **sentence**, not the document.

```js
nlp('the cat sat').match('^the').text()   // 'the'
nlp('the cat sat').match('sat$').text()   // 'sat'
```

### Capture groups — `[ ]` and `[<name> ]`

A capture group marks the part of the match you want to pull out with `.groups()`. Without a name,
groups are positional; with `<name>`, retrieve by name. Groups can span multiple terms.

```js
let doc = nlp('john smith and mary jones')
doc.match('[<first>#FirstName] [<last>#LastName]').groups('last').text()  // 'jones' (per match)

// also works as the 2nd argument to .match():
nlp('the price of milk').match('price of [.]', 0).text()  // 'milk'
```

### Fuzzy — `~word~`

Matches near-spellings / typos using string distance (default threshold ~0.85). Pass a custom
threshold via the options argument: `doc.match('~color~', null, { fuzzy: 0.7 })`.

```js
nlp('the organisation').match('~organization~').text()   // 'organisation'
nlp('hi spencar').match('~spencer~').text()              // 'spencar'
```

### Root / lemma — `{root}` and `{root/pos}`

Match every inflected form of a word by its dictionary root.

```js
nlp('he walked away').match('{walk}').text()    // 'walked'
nlp('she is running').match('{run}').text()     // 'running'
```
Add a part-of-speech to disambiguate: `{walk/verb}`, `{object/noun}`.

```js
nlp('he walks home').match('{walk/verb}').text()      // 'walks'
nlp('the object is heavy').match('{object/noun}').text()  // 'object'
```

### Chunks — `<Noun>` / `<Verb>`

Match a whole noun-phrase or verb-phrase chunk (greedy by default).

```js
nlp('the cat sat down').match('<Noun>').text()   // 'the cat'
```

### Term methods — `@method`

Apply a built-in term predicate. Common ones: `@isTitleCase`, `@isUpperCase`, `@hasComma`,
`@hasHyphen`, `@hasContraction`, `@hasQuote`.

```js
nlp('Hello World now').match('@isTitleCase').out('array')   // ['Hello','World']
```

## Matching against an array (fast path)

For a long list of literal words, `.lookup()` is far faster than many `.match()` calls:

```js
nlp('i saw mary and john').lookup(['mary', 'john']).out('array')   // ['mary','john']
```

## Pre-compiling matches

`nlp.parseMatch(str)` turns a pattern into reusable JSON; `nlp.buildNet([...])` compiles many
patterns into one fast net for `.sweep()`. Use these in hot loops.

## What is NOT supported

- **Nested groups**: `'(modern (major|minor))? general'` — flatten or chain `.match()` calls.
- **Cross-sentence matching** — use the paragraphs plugin.
- **Character-level regex inside a term** — use a real `/regex/` token instead:
  `nlp('color colour').match('/colou?r/').out('array')`.

See [concepts.md](concepts.md) for the document model and [api.md](api.md) for every method.
