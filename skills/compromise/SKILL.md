---
name: compromise
description: Write and debug JavaScript or TypeScript that uses the compromise English NLP library to match text, extract entities or numbers, customize tagging, and transform sentences. Use when the user requests compromise or the project already uses it, especially for its match syntax, selection semantics, build tiers, and plugins.
metadata:
  version: "0.1"
---

# Using compromise

Compromise is a rule-based English NLP library that runs locally in Node.js and browsers.
Its tagging and transformations are heuristic; it does not provide a dependency parse tree,
semantic understanding, or an LLM service.

## Choose the API for the installed version

Inspect the project's compromise version, import, and registered plugins before choosing APIs.
Prefer the full `import nlp from 'compromise'` for ordinary use:

| Import | Available features |
| --- | --- |
| `compromise` or `compromise/three` | Tokenization, tagging, named selections and transforms |
| `compromise/two` | Tokenization and tagging; no `.people()`, `.verbs()`, or `.numbers()` |
| `compromise/one` or `compromise/tokenize` | Tokenization; no automatic part-of-speech tagging |

Use the existing module system; CommonJS can use `const nlp = require('compromise')`.
If a method is missing, check the build tier, version, and plugins before inventing a replacement API.
Specialized transforms belong on specialized selections: use `.verbs().toPastTense()`,
not `.match('#Verb').toPastTense()`.

Read only the detailed docs needed for the task. These paths resolve inside this repository
and packages that ship this skill alongside `docs/`:

- [API](../../docs/api.md): method names, arguments, and specialized selection methods.
- [Match syntax](../../docs/match-syntax.md): pattern operators and capture groups.
- [Tag definitions](../../docs/tag-definitions.md): valid tags and their hierarchy.
- [Concepts](../../docs/concepts.md): document, View, Term, and mutation semantics.
- [Recipes](../../docs/recipes.md): task-specific starting points.
- [Tagging differences](../../docs/tagging-differences.md): conventions when comparing other taggers.

If this skill was installed separately, look for these files in the consuming project's
`node_modules/compromise/docs/` or its resolved package directory. If unavailable, consult the
[upstream repository](https://github.com/spencermountain/compromise) at the installed version's
tag when available. Do not assume the latest docs describe an older installed version.
When docs and behavior disagree, reproduce against that version and inspect its source/types.

## Keep the document and selection distinct

`nlp(text)` returns a View of the whole document. Selections return Views sharing that document.
Transforms mutate the shared document; reading `.text()` from a selection gives only that fragment.
Keep the whole-document variable when the requested output is the rewritten input:

```js
import nlp from 'compromise'

const original = nlp('She walks home.')
const past = original.clone()
past.verbs().toPastTense()
past.text() // 'She walked home.'
original.text() // 'She walks home.'
```

Clone before transforming when the original must be preserved. Cloning a selection does not
turn it into a whole-document selection. `.all()` returns a View of the whole underlying document.

- `.match(pattern)` extracts matching terms; `.has(pattern)` returns a boolean.
- `.if(pattern)` filters the current phrases, retaining each whole phrase containing a match.
  Use `.sentences().if(pattern)` to retain matching sentences.
- `.found` is a boolean property, not a method. An empty View is still a truthy JavaScript object.
- `.replace(from, to)` finds a pattern and replaces it; `.replaceWith(to)` replaces the selection.
- `.text()` returns a string; `.out('array')` returns strings per match;
  `.json()` returns structured records. These are outputs, not chainable Views.
- Text outputs can preserve case and punctuation. `.text('normal')` is not a universal punctuation
  stripper. Choose and verify normalization for the requested output rather than stripping blindly.

## Write term patterns, not character regexes

Patterns operate on tokenized terms within each sentence. Literal words match case-insensitively;
use `{walk}` to include inflections such as `walked`. Use real tag names: `#Person`, `#Place`,
`#Organization`, `#Noun`, `#Verb`, `#Adjective`, `#Value`, and `#Date` are useful starting points.
Tags form a hierarchy, so `#FirstName` also matches `#Person` and `#Noun`.
Unknown tags silently match nothing unless explicitly defined by an extension.
Do not invent tags such as `#Name`, `#Location`, `#Subject`, `#Object`, or `#Adj`.

| Pattern | Meaning |
| --- | --- |
| `#Adjective+ #Noun` | One or more adjective terms followed by a noun |
| `the big? cat` | Optional `big` term |
| `(cat\|dog)` | Alternatives |
| `the . sat` | Exactly one intervening term |
| `the * sat` | Zero or more intervening terms |
| `the !#Verb` | A term that is not a verb after `the` |
| `^the` / `sat$` | Start / end of the current sentence or selection |
| `/^colou?r$/` | Character regex within a term |
| `[<who>#Person+]` | Named capture, retrieved with `.groups('who')` |

```js
const doc = nlp('John Smith arrived. Mary left.')
doc.match('[<who>#Person+] arrived').groups('who').text() // 'John Smith'
doc.sentences().if('arrived').out('array') // ['John Smith arrived.']
doc.has('#Person') // true
```

Matches do not cross sentence boundaries. Nested groups are unsupported; express complex logic
as separate patterns or successive selections, verifying the scope at each step.
Slashes in input split terms; do not assume a slash-joined string is one token.
For literal word lists, consider `.lookup(words)` instead of constructing match syntax from
arbitrary user input. For advanced patterns, consult the match reference before guessing.

## Extract, customize, and extend

```js
nlp('John Smith arrived.').people().out('array') // ['John Smith']
nlp('It costs twelve dollars.').numbers().get() // [12]
nlp('five hundred').numbers().toNumber().text() // '500' (selected number)
nlp('kermit waved', { kermit: 'FirstName' }).people().out('array') // ['kermit']
```

Use `.people()`, `.places()`, and `.organizations()` for named entities; `.nouns()` selects noun
phrases and is not a generic entity detector. Domain vocabulary can be supplied at parse time
as above. `nlp.addWords({...})` and `nlp.plugin({...})` customize subsequent parsing globally;
register shared configuration once, rather than repeatedly inside request handlers.

Plugins add APIs beyond the full core build. For example, parsing dates into calendar values
requires `compromise-dates`; a `#Date` match only selects tagged text. Import a required plugin
and call `nlp.plugin(plugin)` before parsing. Consult that plugin's version-matched docs for
options such as the reference date and timezone. Do not assume every plugin API is in core.

## Check the result, not just that the code runs

Run small examples against the installed build when execution is available. Check exact outputs,
including punctuation and whether the result is a fragment or the full document. For matching,
include a positive example and a near miss; for transforms, check preservation of surrounding text
and, when cloning, the original. Include representative user input rather than only ideal grammar.

When a result is wrong, inspect `doc.debug()` and `doc.json()` to see the actual terms and tags.
Then check selection scope, sentence boundaries, tag spelling, and method availability.
Use `nlp.verbose(true)` for tagger tracing when needed, and disable it with `nlp.verbose(false)`
after diagnosis. Correct domain tagging with a narrow lexicon or rule rather than treating a
failed example as evidence that a guessed pattern is valid.

For entity removal, explicitly select the categories the user needs and verify their coverage;
do not assume `.redact()` includes every category or that heuristic detection guarantees anonymization.
If examples cannot be run, distinguish expected behavior from verified output.
