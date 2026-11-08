# Contractions, possessives, and implicit words

compromise reads `isn't` as two words, `is` and `not`, and reads `spencer's` as either one word
(a possessive) or two (`spencer is`, `spencer has`), depending on the sentence. This happens once,
at parse-time, and the original text is never changed. Every example below is the library's actual
output, from the default `compromise` build unless noted.

```js
let doc = nlp(`she isn't here`)
doc.text()             // "she isn't here"
doc.text('implicit')   // 'she is not here'
doc.has('is not')      // true
doc.has(`isn't`)       // true
```

## How it works: implicit terms

A contraction is split into several **terms**. The first term keeps the original text, and each
later term is an *implicit* term with empty `text` and the hidden word in `.implicit`:

```js
nlp(`she isn't here`).json()[0].terms.map(t => [t.text, t.implicit, t.tags])
// [ ['she',   undefined, ['Noun','Pronoun']],
//   ["isn't", 'is',      ['Verb','Copula','PresentTense']],
//   ['',      'not',     ['Negative']],
//   ['here',  undefined, ['Noun','Uncountable']] ]
```

Both halves are tagged as if they were written out. `.debug()` shows implicit words in brackets:

```text
  │ '[spencer]'  - Noun, Singular, ProperNoun, Person, FirstName, MaleName
  │ '[is]'       - Verb, Copula, PresentTense
  │ 'cool'       - Adjective
```

This has a few visible consequences:

| | `nlp("she isn't here")` |
|---|---|
| `.text()` | `"she isn't here"` — always the original |
| `.text('implicit')` / `.text('machine')` | `'she is not here'` |
| `.json({ implicit: true })[0].implicit` | `'she is not here'` |
| `.terms().length` | `4` |
| `.wordCount()` | `3` — implicit terms are not counted |
| `.terms().out('array')` | `['she', "isn't", 'here']` — the empty term is dropped |
| `.json({ offset: true })` | the `not` term has `length: 0` |

A match that lands only on the hidden half has no text of its own, so use `.text('implicit')`
to read it:

```js
let doc = nlp(`spencer's cool`)
doc.match('is').text()            // ''
doc.match('is').text('implicit')  // 'is'
doc.match('is').out('array')      // []
doc.verbs().text()                // ''
doc.verbs().text('implicit')      // 'is'

nlp(`he's gone home`).verbs().text()            // 'gone'
nlp(`he's gone home`).verbs().text('implicit')  // 'has gone'
nlp(`he's gone home`).verbs().json()[0].verb.auxiliary  // 'has'
```

## Matching contractions

A match pattern can use either form. Matching the contracted word consumes all of its terms:

```js
let doc = nlp(`i haven't done it`)
doc.match(`have not done`).text()   // "haven't done"
doc.match(`haven't done`).text()    // "haven't done"
doc.match(`have not`).text()        // "haven't"
doc.match(`not done`).text()        // 'done'   (the 'not' half has no text)
doc.match(`have done`).text()       // ''       (not adjacent)
```

Half of a contraction does not match the whole:

```js
let doc = nlp(`We won't match`)
doc.match('we will match').found       // false
doc.match('we will? match').found      // false
doc.match('we will not match').found   // true
```

This holds for the longer fixed forms too: `nlp("i gotta go").match('gotta go')` finds
`gotta go`, and so does `match('have got to go')`.

`@hasContraction` matches any term that was expanded. A possessive is not a contraction:

```js
nlp(`spencer's cool`).match('@hasContraction').out('array')   // ["spencer's"]
nlp(`spencer's house`).match('@hasContraction').out('array')  // []
nlp(`spencer's house`).has(`spencer's`)    // true
nlp(`spencer's house`).has('spencer is')   // false
nlp(`spencer's cool`).has(`spencer's`)     // true
nlp(`spencer's cool`).has('spencer is')    // true
```

`.contractions()` returns the expanded words as a view. Contractions in one doc are numbered from
zero:

```js
let doc = nlp(`i'm here and you're there`)
doc.contractions().length      // 2
doc.contractions(0).text()     // "i'm"
```

## What gets expanded

### Apostrophe forms

| Ending | Reads as | Example |
|---|---|---|
| `n't` | `not` | `didn't` → `did not`, `can't` → `can not`, `won't` → `will not`, `shan't` → `should not` |
| `'ll` | `will` | `spencer'll` → `spencer will` |
| `'ve` | `have` | `we've`, `should've`, `might've` → `might have` |
| `'re` | `are` | `they're` |
| `'m` | `am` | `I'm` |
| `'d` | `did`, `had`, or `would` | see [`'d`](#d-did-had-or-would) |
| `'s` | possessive, `is`, `has`, or `us` | see [`'s`](#s-possessive-is-has-or-us) |

A double contraction ending in `'ve` is three words: `wouldn't've` → `would not have`,
`I'd've` → `i would have`, `can't've` → `can not have`.

Curly apostrophes (`’ ‘`) work the same as straight ones. Capitals are kept on the original text,
but expanded words come out lowercase, except for a title-cased first word:

```js
nlp(`DON'T GO`).text('implicit')   // 'do not GO'
nlp(`Don't go`).text('implicit')   // 'Do not go'
```

### `ain't`

`ain't` is read from its subject: `am not`, `is not`, or `are not`. Before `never`, it is `has` or
`have`. `aint` without the apostrophe works the same.

```js
nlp(`i ain't going`).text('implicit')          // 'i am not going'
nlp(`we aint going`).text('implicit')          // 'we are not going'
nlp(`she ain't going`).text('implicit')        // 'she is not going'
nlp(`the dogs ain't here`).text('implicit')    // 'the dogs are not here'
nlp(`he ain't never seen it`).text('implicit') // 'he has never seen it'
nlp(`i ain't never seen it`).text('implicit')  // 'i have never seen it'
```

### Fixed forms, without an apostrophe

These are looked up as whole words. Slang:

| Word | Reads as | Word | Reads as |
|---|---|---|---|
| `gonna` | going to | `gotta` | have got to |
| `wanna` | want to (see [below](#wanna)) | `tryna` | trying to |
| `gimme` | give me | `outta` | out of |
| `dunno` | do not know | `cannot` | can not |
| `shoulda` | should have | `musta` | must have |
| `coulda` | could have | `woulda` | would have |
| `c'mon` | come on | `c'mere` | come here |
| `y'know` | you know | `alot` | a lot |
| `tis`, `'tis` | it is | `twas`, `'twas` | it was |
| `ne'er` | never | `o'er` | over |

Missing apostrophes: `dont`, `cant`, `wont`, `isnt`, `wasnt`, `hasnt`, `arent`, `shouldnt`,
`couldnt`, `wouldnt`, `im`, `ive`, `dun` (do not), and `howd`, `whatd`, `whend`, `whered` (how did,
etc.). `imma` is read as `I will`.

Text-speak: `brb`, `gtg`, `imo`, `irl`, `rn`, `tbh`, and `@` (at).

```js
nlp(`we're gonna win`).text('implicit')   // 'we are going to win'
nlp(`i gotta go`).text('implicit')        // 'i have got to go'
nlp(`he's gotta go`).text('implicit')     // 'he has got to go'
nlp(`get outta here`).text('implicit')    // 'get out of here'
```

### Not expanded

These stay as one word, so a match for `let me` will not find `lemme`:

- `lemme`, `kinda`, `sorta`, `hafta`, `oughta`, `lotta`, `cuppa`, `finna`, `ima`, `innit`
- `whatcha`, `gotcha`, `betcha`, `ya`, `yall`, `y'all`, `ma'am`, `o'clock`
- `'em`, `'cause`, `'til`, `ol'`, `goin'`, `chillin'` — the apostrophe stays in the term's text,
  is stripped from `.normal`, and nothing is added
- `idk`, `lol`, `omg`, `btw`, `fyi`, `asap`, `pls`, `thx`, `ur`, `u`

### `wanna`

`wanna` is `want to`, except before a bare noun, where it is just `want`:

```js
nlp(`I wanna go`).text('implicit')                 // 'I want to go'
nlp(`I wanna pickle`).text('implicit')             // 'I want pickle'
nlp(`do you wanna coffee?`).text('implicit')       // 'do you want coffee?'
nlp(`I wanna pickle some beets`).text('implicit')  // 'I want to pickle some beets'
```

### `'d`: did, had, or would

After a question word it is `did`. Otherwise the next words decide: a past-tense verb, a
determiner, or `been`, `gone`, `better`, `done`, `before`, `it` means `had`, and a present verb or
`have`, `be` means `would`. With no clue, it is `would`.

```js
nlp(`how'd you do that`).text('implicit')   // 'how did you do that'
nlp(`i'd walked`).text('implicit')          // 'i had walked'
nlp(`she'd been there`).text('implicit')    // 'she had been there'
nlp(`he'd better go`).text('implicit')      // 'he had better go'
nlp(`they'd an issue`).text('implicit')     // 'they had an issue'
nlp(`they'd both go`).text('implicit')      // 'they would both go'
nlp(`i'd like a coffee`).text('implicit')   // 'i would like a coffee'
nlp(`he'd have gone`).text('implicit')      // 'he would have gone'
nlp(`he'd`).text('implicit')                // 'he would'
```

## `'s`: possessive, is, has, or us

This is the hard one. A wrong call invents a verb, or hides one, so the decision is made in
steps and looks at the whole clause.

### Always, or never, possessive

- `let's` is `let us`. `that's`, `what's`, `there's`, `here's`, `who's`, `where's`, `how's`,
  `he's`, `she's` and `it's` are never possessive.
- `it's` is `it is` / `it has`, unless it was clearly meant as `its`: after a verb or preposition,
  before a thing (`the cat licked it's paw`, `on it's way`), before `own`, or as the subject before
  `is` (`it's fur is soft`). `it's time we left` and `it's dinner` still read `it is`.
- `there's` is `there has` before `been`, `there are` before a plural (`there's cats`), else
  `there is`.
- A word before `gonna`, `gotta`, `got` or `been` is a contraction: `the man in black's gonna rock`
  reads `black is`.

### Possessive clues

The 's is a possessive when:

- the sentence ends there: `it was spencer's`
- it is followed by `and`, `or`, a comma, or another possessive: `Kathy's and Mary's friend`,
  `Hamlet's mother's words`
- it follows a preposition: `in Sunday's final`, `we went to Moe's for lunch`, `a master's of science`
- a superlative or number follows: `the world's largest city`, `baby's first steps`
- a capitalised title follows: `Verne's The Mysterious Island`
- a noun follows: `spencer's house`, `the dog's bone`, `John's car is red`
- the sentence is already a question with a verb: `Is Wendy's still open`
- a lexicon tag says so: `nlp("Rob's cool", { "rob's": 'Possessive' })`

### Verb clues

The 's is `is` before an adjective, adverb, determiner, or an -ing verb, and `has` before a
past-tense verb:

```js
nlp(`spencer's cool`).text('implicit')             // 'spencer is cool'
nlp(`spencer's walking`).text('implicit')          // 'spencer is walking'
nlp(`spencer's walked to work`).text('implicit')   // 'spencer has walked to work'
nlp(`she's finished her work`).text('implicit')    // 'she has finished her work'
nlp(`he's got a car`).text('implicit')             // 'he has got a car'
nlp(`it's been a while`).text('implicit')          // 'it has been a while'
```

A past-tense word that is being used as a describing word is `is`, by its context:

| | reads as |
|---|---|
| `the car's parked outside` | is |
| `the meeting's scheduled for 3 PM` | is |
| `it's called a peach` / `he's supposed to be here` | is |
| `it's said to be haunted` | is |
| `he's called me twice` | has |
| `the plane's landed` | has |
| `she's said enough` | has |

### Ambiguous words

An -ing word or a describing word can be a noun. The words after it decide:

| | reads as |
|---|---|
| `the dog's barking` | is |
| `Jamaica's growing rapidly` | is |
| `Toronto's housing market set a record` | possessive |
| `John's nuts about Georgia` | is |
| `John's nuts were roasting` | possessive |
| `the cell's natural` | is |
| `the cell's natural mechanisms` | possessive |
| `the rocket's red` | is |
| `the rocket's red glare` | possessive |
| `John's played football` | has |
| `John's finished product sold well` | possessive |
| `Mom's cooked dinner` | has |
| `the company's bottled water comes from a spring` | possessive |
| `my name's Dave`, `the captain's John` | is |
| `TV's John Wayne` | possessive |
| `the chair's his` | is |

There are more of these in `tests/02-two/contraction-two/`.

### Plural and s-apostrophe owners

An owner written with a trailing apostrophe is tagged `#Possessive` by a regex, which wants at
least four letters before the `s'`. Shorter words are missed, and nothing is expanded either way:

```js
nlp(`the flanders' house`).match('#Possessive').out('array')  // ["flanders'"]
nlp(`James' car`).match('#Possessive').out('array')           // ["James'"]
nlp(`the dogs' bones`).match('#Possessive').out('array')      // []
```

### Years and decades

A number with 's stays a number, and is also a possessive:

```js
let doc = nlp(`2020's election`)
doc.has('(#Year && #Possessive)')   // true
doc.numbers().get()                 // [2020]
nlp(`the 1990's were great`).has('#Year')        // false  (a decade)
nlp(`the 1990's were great`).has('#Possessive')  // false  (and not an owner, like '1990s')
```

### Possessive pronouns

`my`, `its`, `our`, `thy` are always `#Possessive`. `her`, `his`, `their`, `your`, `hers`, `theirs`
are tagged from context. `whose` is a `#QuestionWord`, and `mine` is not tagged possessive.

### `.possessives()`

Returns each possessive, grown to include a multi-word name. `.strip()` removes the `'s`:

```js
nlp(`Spencer C. Kelly's`).possessives().out('array')   // ["Spencer C. Kelly's"]
nlp(`Hamlet's mother's words`).possessives().out('array')   // ["Hamlet's mother's"]

let doc = nlp(`the dog's bone and john's car`)
doc.possessives().strip()
doc.text()   // 'the dog bone and john car'
```

`.strip()` also handles a curly `’s` and a trailing `s'`: `the flanders' house` becomes
`the flanders house`. `.text('machine')` drops the `'s` too: `nlp("spencer's house").text('machine')`
is `'spencer house'`.

`.replaceWith()` drops a possessive unless asked to keep it:

```js
nlp(`Tom's dog sat.`).people().replaceWith('Bobby').all().text()                        // 'Bobby dog sat.'
nlp(`Tom's dog sat.`).people().replaceWith('Bobby', { possessives: true }).all().text() // "Bobby's dog sat."
nlp(`Tom's dog sat.`).redact().text()                                                   // "██████████'s dog sat."
```

## Numbers

A compact range becomes three terms, tagged `#NumberRange`, and a number glued to a lowercase unit
becomes two:

```js
nlp(`between 5-7.`).text('implicit')   // 'between 5 to 7.'
nlp(`between 5-7`).numbers().get()     // [5, 7]
nlp(`4-5pm`).text('implicit')          // '4 to 5pm'
nlp(`3:45-11pm`).text('implicit')      // '3:45 to 11pm'
nlp(`20th-21st`).text('implicit')      // '20th to 21st'
nlp(`12 - 14`).text('implicit')        // '12 to 14'
nlp(`2019-2020`).text('implicit')      // '2019 to 2020'

nlp(`it is 4km away`).text('implicit') // 'it is 4 km away'
nlp(`4km`).json()[0].terms[1].tags     // ['Noun', 'Singular', 'Unit']
nlp(`100km/h`).text('implicit')        // '100 km/h'
nlp(`4.5kg`).text('implicit')          // '4.5 kg'
```

Not split: a phone number (`555-1234`), `99%`, `$5`, an uppercase unit (`30°C`), and the number
suffixes `st nd rd th am pm max ° s e er ère ème`, so `3rd`, `12pm`, `1990s`, `5°`, and the French
ordinals `1er`, `2ème`, `18e` stay whole. Any other letters are taken as a unit: `5x` becomes `5 x`.

## French and other languages

The rules are for English, with a small nod to French elision. A word starting `j'`, `l'`, `d'`,
`c'`, `m'`, `n'`, `qu'`, `s'` or `t'` is split into a pronoun or article and the word after it:

```js
nlp(`j'aime Paris`).text('implicit')         // 'je aime Paris'
nlp(`c'est la vie`).text('implicit')         // 'ce est la vie'
nlp(`je m'appelle Jean`).text('implicit')    // 'je me appelle Jean'
nlp(`Qu'est-ce que c'est?`).text('implicit') // 'que est- ce que ce est? '
```

`l'` and `d'` guess the article's gender from the word's ending, roughly: a word ending in `e` is
`la`, with a short list of exceptions, so `l'amour` is `le amour`, `l'école` is `la ecole`, `l'homme`
is `le homme` and `l'eau` is `la eau`. `d'amerique` is `du amerique`. The remainder has to be at least
three letters, so `s'il`, `n'ai`, `m'a`, `t'es` are left whole, as are `aujourd'hui`, `jusqu'à`
and `lorsqu'il`. Accents are dropped from the expanded words (`l'été` reads `la ete`).

The same rules hit names and other languages:

| Input | Reads as |
|---|---|
| `D'Angelo`, `d'Artagnan` | `de angelo`, `de artagnan` |
| `L'Oreal` | `le oreal` |
| `l'italiano` | `le italiano` — the French article |
| `O'Brien`, `O'Reilly's car`, `McDonald's` | left alone |
| `Dell'Orto`, `all'inizio`, `un'altra` (Italian) | left alone |
| `wie geht's`, `ich hab's` (German) | left alone — `'s` is only split from a word the tagger knows |
| `'s avonds`, `'s-Hertogenbosch` (Dutch) | `s avonds` — the apostrophe is treated as a quote |
| `Hawai'i`, `Xi'an` | left alone |

A lexicon entry does not protect a word from splitting; `nlp("D'Angelo", { "d'angelo": 'LastName' })`
still reads `de angelo`. For text that is not English, turn the passes off (see
[Turning it off](#turning-it-off)).

## Changing the text

### `.expand()` and `.contract()`

`.contractions().expand()` writes the hidden words into the text. It mutates the document and can
be run any number of times. `.contract()` does the reverse, for a fixed set of pairs:

```js
let doc = nlp(`we're not gonna take it`)
doc.contractions().expand()
doc.text()   // 'we are not going to take it'
doc.contract()
doc.text()   // "we're not going to take it"
```

`.contract()` joins: `we|they|you are`, `he|she|they|it|we|you will`, `he|she|they|it|we is`,
`[person] is`, `[person] would`, `[verb] not` (`isn't`, `didn't`, `wouldn't`...), `can not`,
`i|we|they have`, `would|should|could have`, and `i am`. So `i will go`, `she has gone`, and
`they would go` are left alone, and `that is not true` becomes `that isn't true`. A comma, bracket,
quote, dash or line-break between the words blocks it: `Tony, is here` stays.

`.normalize()` expands contractions in its `'medium'` and `'heavy'` presets, and strips possessives
in `'heavy'`. Or ask for just one:

```js
nlp(`Spencer's house isn't big`).normalize({ contractions: true }).text()  // "Spencer's house is not big"
nlp(`Spencer's house isn't big`).normalize({ possessives: true }).text()   // "Spencer house isn't big"
nlp(`Spencer's house isn't big`).normalize('medium').text()                // "spencer's house is not big"
```

### Transforms see through contractions

Verb methods work on the hidden words, and rewrite the whole contraction:

```js
let doc = nlp(`she isn't here`)
doc.verbs().toPastTense()
doc.text()   // 'she was not here'

doc = nlp(`she's here`)
doc.verbs().toNegative()
doc.text()   // 'she is not here'
doc.contract()
doc.text()   // "she's not here"

doc = nlp(`i'll go`)
doc.verbs().toPastTense()
doc.text()   // 'i went'
```

`.replace()`, `.remove()`, `.insertBefore()` and `.insertAfter()` can target either half:

```js
let doc = nlp(`i'd walked`)
doc.replace('had', 'foo')
doc.text()   // 'i foo walked'

nlp(`i'd walked`).remove('had').all().text()                         // 'i walked'
nlp(`i'd walked`).match('had').insertBefore('really').all().text()   // 'i really had walked'
```

### New text is not expanded

Text added after parsing is tokenized but not run through the contraction passes. Run
`.compute('contractions')` to expand it; it only touches terms that are not already expanded:

```js
let doc = nlp(`we ran home`)
doc.match('ran').replaceWith(`won't`)
doc.has('will not')   // false
doc.compute('contractions')
doc.has('will not')   // true
```

`.clone()` copies the implicit terms, so a clone can be expanded without touching the original.

## Build tiers

| | `compromise/one` | `compromise/two` | `compromise` |
|---|---|---|---|
| `n't`, `'ll`, `'ve`, `'re`, `'m`, the fixed forms, `that's`, `there's` | ✓ | ✓ | ✓ |
| `'d` | only `how'd`, and before `be go start think need been gone` | ✓ | ✓ |
| `'s` as `is`/`has` | ✗ — `spencer's cool` stays one word | ✓ | ✓ |
| `ain't` | ✗ | ✓ | ✓ |
| `wanna` before a noun | ✗ (`want to pickle`) | ✓ | ✓ |
| number ranges, units, French | ✓ | ✓ | ✓ |
| `.contractions()`, `.contract()` | ✗ | ✓ | ✓ |
| `.possessives()`, `.normalize()` | ✗ | ✗ | ✓ |

`nlp.tokenize()` runs the first pass only, so `nlp.tokenize("spencer's cool")` stays two terms.

The first pass runs before any tagging, and is the compute step named `contractions`. The second
needs the tags from the preTagger, and is named `contractionTwo`; it re-tags the words around each
expansion. `nlp.hooks()` lists the order.

## Customizing

### Add or remove a form

The fixed forms live in `nlp.model().one.contractions`, as `{ word, out }` entries. A plugin's
`model` adds to the list, or mutate the array directly:

```js
nlp.plugin({ model: { one: { contractions: [{ word: 'yolo', out: ['you', 'only', 'live', 'once'] }] } } })
nlp(`yolo`).has('you only live once')   // true

nlp.model().one.contractions.push({ word: 'finna', out: ['fixing', 'to'] })
nlp(`finna go`).text('implicit')   // 'fixing to go'

let model = nlp.model()
model.one.contractions = model.one.contractions.filter(o => o.word !== 'gonna')
nlp(`we're gonna win`).text('implicit')   // 'we are gonna win'
```

The first entry for a word wins, so a plugin cannot override a built-in form by adding one. Filter
the built-in out first.

Entries with `after` (`{ after: 'll', out: ['will'] }`) handle a suffix, and entries with `before`
(`{ before: 'c', out: ['ce'] }`) handle a prefix. The `'d`, `'s`, `n't`, and `j'`/`l'`/`d'` rules
are code, not data.

### Number suffixes

`nlp.model().one.numberSuffixes` is the set of letters that are not split off a number:

```js
nlp(`5x`).text('implicit')   // '5 x'
nlp.model().one.numberSuffixes.x = true
nlp(`5x`).text('implicit')   // '5x'
```

### Force a possessive

A `Possessive` lexicon tag is honoured ahead of the context rules:

```js
nlp(`Rob's cool`, { "rob's": 'Possessive' }).text('implicit')   // "Rob's cool"
nlp.addWords({ "spencer's": 'Possessive' })
```

There is no tag for the opposite. To force `is`, write it out after parsing:

```js
let doc = nlp(`spencer's house`)
doc.match(`spencer's`).replaceWith('spencer is')
doc.has('spencer is')   // true
```

### Turning it off

Each pass is a compute method, so replacing it with a no-op disables it. Disable both to keep
every apostrophe word whole, as for non-English text:

```js
nlp.plugin({ compute: { contractions: () => {}, contractionTwo: () => {} } })
nlp(`she isn't here`).terms().out('array')   // ['she', "isn't", 'here']
nlp(`l'amour`).terms().out('array')          // ["l'amour"]
nlp(`4km`).terms().out('array')              // ['4km']
```

Disabling only `contractionTwo` keeps the first pass: `isn't` still splits, but `'s`, `ain't`
and most `'d` words stay whole and get tagged as one word. Removing the names from `nlp.hooks()`
has the same effect. Either change is global to the `nlp` instance, and nothing re-joins a word
once parsed.

## Debugging

```js
nlp.verbose('contractions')
nlp(`spencer's cool, but john's car isn't`)
//   "isn't" →  ['is', 'not']
//   "john's" →  possessive (kept)
//   "spencer's" →  ['spencer', 'is']
nlp.verbose(false)
```

`nlp.verbose('contractions', { word: "john's" })` logs one word. `doc.debug()` shows the result,
with implicit words in brackets.

The `'s` decision is made in six places, in run order. They are listed, with their file paths, in a
comment at the top of `src/2-two/contraction-two/compute/index.js`, and each file points back to it.
