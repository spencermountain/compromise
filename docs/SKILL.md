---
name: compromise-nlp
description: >-
  Write correct code with the `compromise` JavaScript NLP library (the npm package `compromise`,
  imported as `nlp`). Use this whenever you are writing or editing JS/TS that imports compromise,
  calls `nlp(...)`, or chains methods like `.match()`, `.tag()`, `.people()`, `.verbs()`,
  `.nouns()`, `.numbers()`, `.normalize()`, or `.replace()` — and also whenever doing
  rule-based natural-language tasks in JavaScript (extracting entities/dates/numbers, matching
  text patterns, changing verb tense, pluralizing, redacting/anonymizing text, building a simple
  chatbot intent matcher) where compromise is or could be the tool. compromise's match-syntax and
  tagset are non-obvious and easy to get wrong from memory; consult this skill before guessing.
---

# Using compromise

`compromise` is a rule-based English NLP library for JavaScript (no network, no model, no deps).
You tokenize text into a **document**, it tags each word's part-of-speech, and you **find** and
**transform** parts of the text with a jQuery-like chained API.

```js
import nlp from 'compromise'

let doc = nlp('she sells seashells by the seashore.')
doc.verbs().toPastTense()        // transform
doc.text()                       // 'she sold seashells by the seashore.'
```

## The five rules that prevent almost every mistake

These are the things that are easy to get wrong from memory. Internalize them before writing code.

### 1. Transforms mutate the document in place — read the result from the original variable

Every transform method (`.toPastTense()`, `.replace()`, `.tag()`, `.normalize()`, case/whitespace
methods…) changes the underlying document. The View it *returns* is the selection it acted on, **not
the whole document**. So calling `.text()` on the chain gives you only the selected fragment:

```js
let doc = nlp('I walk to work')
doc.verbs().toPastTense()
doc.text()                                            // ✅ 'I walked to work'  (read from doc)

nlp('I walk to work').verbs().toPastTense().text()    // ❌ 'walked work'  (just the selection)
```

To transform a copy and leave the original untouched, call `.clone()` first:

```js
let past = doc.clone().verbs().toPastTense().text()
```

Read-only methods (`.match`, `.has`, `.if`, `.found`, `.text`, `.json`, accessors) never mutate.

### 2. Only real tags work — an invalid `#Tag` matches nothing, silently

There are ~88 valid part-of-speech tags, and they're a hierarchy (`#FirstName` ⊂ `#Person` ⊂
`#Noun`). A `#Tag` that isn't real does not error — it just matches nothing, which looks like a
logic bug. Common inventions that are **NOT** tags: `#Name`, `#Location`, `#Subject`, `#Object`,
`#Adj`, `#Entity`. (Valid ones include `#Person`, `#Place`, `#Organization`, `#Noun`, `#Verb`,
`#Value`, `#Date`.) When unsure, check `node_modules/compromise/docs/tags.md`.

### 3. Match-syntax is term-level, not regex

`.match()` matches whole **words/terms**, not characters. `+ * ? . ^ $` operate on terms. For
character-level patterns, use a `/regex/` token. Cheat sheet (see references for the rest):

| Token | Means | Example |
|---|---|---|
| `#Tag` | a part-of-speech tag | `#Person` |
| `.` | any one term | `the . sat` |
| `*` | any run of terms | `the * sat` |
| `(a\|b)` | one of these | `(cat\|dog)` |
| `word?` | optional term | `the big? cat` |
| `#Tag+` | one or more | `#Adjective+` |
| `!` | negate a term | `the !#Verb` |
| `[ ]` / `[<name> ]` | capture group | `[<who>#Person+]` |
| `^` / `$` | sentence start / end | `^the` / `sat$` |
| `~word~` | fuzzy / typo-tolerant | `~organization~` |
| `{root}` | match all conjugations | `{walk}` matches walked/walking |
| `/regex/` | character-level regex | `/colou?r/` |

```js
nlp('John Smith left').match('[<who>#Person+]').groups('who').text()   // 'john smith'
```

### 4. Sentences are the ceiling — matches don't cross sentence boundaries

`nlp("that's it. Back to Winnipeg!").has('it back')` is `false`. For multi-sentence matching, use
the `compromise-paragraphs` plugin.

### 5. `compromise` is the full build — import it unless size is critical

- `import nlp from 'compromise'` — full library: `.people()`, `.verbs()`, `.numbers()`, all selections. **Default.**
- `import nlp from 'compromise/two'` — POS tags + `.match()`, but no named selections.
- `import nlp from 'compromise/tokenize'` (`/one`) — tokenize only, **no tags** (`#Tag` patterns won't work).

There's no useful tree-shaking below these tiers; run the full build.

## Common tasks (verified patterns)

```js
// entities
nlp(text).people().out('array')        // ['Mary', 'Dr. John Smith']
nlp(text).topics().out('array')        // people + places + organizations
// NOTE: out('array') keeps trailing punctuation ('Paris.'); use .text('normal') for clean tokens

// transform (remember rule #1 — read from doc)
let d = nlp('I walk'); d.verbs().toPastTense(); d.text()      // 'I walked'
let n = nlp('one dog'); n.nouns().toPlural(); n.text()        // 'one dogs'

// numbers
nlp('five hundred').numbers().toNumber().text()   // '500'
nlp('it cost twelve dollars').numbers().get()     // [12]

// find / route (boolean, never mutates)
nlp('the deal is closed').has('#Determiner #Noun')   // true

// teach it words
nlp(text, { kermit: 'FirstName' })                // per-call lexicon
nlp.addWords({ frodo: 'FirstName' })              // global
```

## Sharp edges to warn the user about (current behavior)

- `.redact()` removes people, places, emails, and phone numbers — but **not organizations**,
  despite some docs saying otherwise. Redact orgs yourself: `doc.organizations().replaceWith('███')`.
- A few methods appear in older docs but **do not exist** and will throw: `.money().currency()`,
  `.fractions().toText()`, `.percentages().toFraction()`. Use `.money().json()` / `.fractions().get()` instead.
- `.out('array')` and `.text()` include surrounding punctuation; `.text('normal')` or `.json()` `normal` give cleaned forms.

## Debugging a wrong result

```js
doc.debug()        // prints how every word was actually tagged — start here
doc.json()         // full structured data: terms, tags, offsets
nlp.verbose(true)  // log the tagger's decision-making
```

If `.match()` returns nothing: confirm the tag is real (rule #2), remember sentence boundaries
(rule #4), and recall exact words match literally (use `{root}` for all conjugations).

## Going deeper — read the version-matched docs in the installed package

The authoritative docs ship inside the package the project actually installed, so they match its
exact version. Read these when you need more than the cheat sheet above:

- `node_modules/compromise/docs/match-syntax.md` — every match operator, with examples
- `node_modules/compromise/docs/tags.md` — the complete, valid tagset with the hierarchy
- `node_modules/compromise/docs/api.md` — every method, signature, and description
- `node_modules/compromise/docs/recipes.md` — copy-paste solutions to common tasks
- `node_modules/compromise/docs/concepts.md` — the document/View/Term model in full
- `node_modules/compromise/docs/llms-full.txt` — all of the above in one file

(When working inside the compromise repo itself, these are at `docs/…` and `AGENTS.md`.)
