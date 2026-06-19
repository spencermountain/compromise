# Compromise — core concepts

A 5-minute mental model. Read this before writing compromise code.

## What it is

`compromise` is a rule-based NLP library for English. It tokenizes text, tags each word with
its part-of-speech, and lets you **find** and **transform** parts of the text. It is fast,
runs offline in the browser or node, has no dependencies, and makes "good-enough" decisions —
it is not a neural/LLM model and does not call out to one.

```js
import nlp from 'compromise'

let doc = nlp('she sells seashells by the seashore.')
doc.verbs().toPastTense()
doc.text()
// 'she sold seashells by the seashore.'
```

## The three objects

| Object | What it is |
|---|---|
| **Document** | the whole parsed text, held internally as `Term[][]` (sentences of terms). |
| **View** | a *selection* of terms within a document — the thing every method returns. `nlp(text)` returns a View of the whole document; `.match('#Verb')` returns a smaller View. A View still knows about its whole document (`.all()` zooms back out). |
| **Term** | a single tokenized word, with `.text`, `.pre`/`.post` (surrounding whitespace/punctuation), `.normal`, and a `Set` of `tags`. |

Almost every method is called on a View and returns a new View, so calls chain:

```js
nlp(text).match('#Person+').first().text()
```

## Mutability — the #1 gotcha

A View points at the underlying document. **Transform methods mutate that shared document in
place**, even though they also return a View:

```js
let doc = nlp('I walk to work')
doc.verbs().toPastTense()       // mutates doc, even though we didn't reassign
doc.text()                      // 'I walked to work'  ← doc changed
```

- Read-only methods (`.match`, `.if`, `.found`, `.text`, `.json`, `.has`, accessors) do **not** change the document.
- Transform methods (`.toPastTense`, `.replace`, `.remove`, `.tag`, `.normalize`, case/whitespace methods …) **do**.
- To work on a copy without touching the original, call **`.clone()`** first:

```js
let past = doc.clone().verbs().toPastTense().text()   // doc is untouched
```

## Sentences are the top-level unit

Matching does **not** cross sentence boundaries by default.

```js
nlp("that's it. Back to Winnipeg!").has('it back')   // false
```

For multi-sentence / paragraph matching use the [`compromise-paragraphs`](https://github.com/spencermountain/compromise/tree/master/plugins/paragraphs) plugin.

## Build tiers (`one` / `two` / `three`)

The default import is the full library. Smaller builds exist for size/speed:

| Import | Includes | Use when |
|---|---|---|
| `compromise` (= `compromise/three`) | tokenize + tags + **all selections** (`.nouns()`, `.verbs()`, `.people()`, `.numbers()` …) | **default — what you almost always want** |
| `compromise/two` | tokenize + POS tags + contractions | you only need tags + `.match()`, not the named selections |
| `compromise/one` (= `compromise/tokenize`) | tokenize only, **no tags** | you only need words/sentences split up; `#Tag` patterns won't work |

```js
import nlp from 'compromise'          // full (recommended)
import nlp from 'compromise/two'      // tags, no selections
import nlp from 'compromise/tokenize' // tokens only
```

There is no meaningful tree-shaking beyond these tiers — the tagger is greedy and competitive,
so pulling individual pieces out is not recommended. Run the full library unless size is critical.

## Getting data out

```js
doc.text()            // a string
doc.out('array')      // array of strings, one per match
doc.json()            // rich data: terms, tags, offsets, etc.
doc.debug()           // pretty-print the tagging to the console (great for debugging)
```

## Customising

Three escalating ways to teach compromise new things — see [recipes.md](recipes.md) and
[the `.extend()` section of the README](../README.md):

1. **A lexicon object** at parse time: `nlp(text, { kermit: 'FirstName' })`
2. **`nlp.addWords({...})` / `nlp.addTags({...})`** globally.
3. **`nlp.plugin({...})`** / **`nlp.extend({...})`** — add words, tags, new methods, and post-processing.

## Known limitations

- **No nested match syntax** — `'(modern (major|minor))? general'` is not supported. Chain successive `.match()` calls instead.
- **No inter-sentence matching** without the paragraphs plugin (see above).
- **Slashes split into separate words** — `nlp('eats/shoots/leaves').has('koala leaves')` is `false`.
- **No dependency/parse tree** — transformations are heuristic, not grammar-tree based.

## See also

- [match-syntax.md](match-syntax.md) — the match mini-language
- [tags.md](tags.md) — the full tagset
- [api.md](api.md) — every method
- [recipes.md](recipes.md) — copy-paste task examples
