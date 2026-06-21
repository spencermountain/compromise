# AGENTS.md — using compromise

Guidance for AI coding agents (and humans) writing code with **compromise**, a rule-based English
NLP library. This file is the map; the linked docs are the territory. Prefer them over guessing —
the published docs at observablehq.com are interactive notebooks and do not render as readable text.

## Read these first

| File | What's in it |
|---|---|
| [docs/concepts.md](docs/concepts.md) | the document/View/Term model, **mutability**, build tiers — the mental model |
| [docs/match-syntax.md](docs/match-syntax.md) | the `.match()` mini-language (`#Tag`, `[capture]`, `(a\|b)`, `~fuzzy~`, `{root}`, …) |
| [docs/tags.md](docs/tags.md) | the complete, valid part-of-speech tagset |
| [docs/api.md](docs/api.md) | every method, signature, and one-line description |
| [docs/recipes.md](docs/recipes.md) | copy-paste solutions to common tasks |
| [llms-full.txt](docs/llms-full.txt) | all of the above concatenated into one file |
| [docs/SKILL.md](docs/SKILL.md) | example skill for using compromise in a coding agent |

## 30-second mental model

```js
import nlp from 'compromise'

let doc = nlp('she sells seashells by the seashore.')  // parse → a View of the whole document
doc.verbs().toPastTense()                               // select verbs, transform them (mutates doc)
doc.text()                                              // 'she sold seashells by the seashore.'
```

- `nlp(text)` returns a **View**. Almost every method returns a View, so calls **chain**.
- **Find** with `.match()`, `.has()`, `.if()`, or named selections like `.people()`, `.numbers()`.
- **Transform** with `.toPastTense()`, `.replace()`, `.tag()`, `.normalize()`, etc.
- **Output** with `.text()`, `.json()`, `.out('array')`, `.debug()`.

## Rules that prevent most mistakes

1. **Transforms mutate the document in place.** The View they return is the *selection*, not the
   whole doc. Read the final result from the original variable:
   ```js
   let doc = nlp('I walk to work')
   doc.verbs().toPastTense()
   doc.text()                       // ✅ 'I walked to work'
   // ❌ nlp('I walk to work').verbs().toPastTense().text()  →  'walked work' (selection only)
   ```
   Use `.clone()` to transform a copy without touching the original.

2. **Only real tags work.** A `#Tag` that isn't in [docs/tags.md](docs/tags.md) matches **nothing,
   silently**. Frequent inventions that are NOT tags: `#Name`, `#Location`, `#Subject`, `#Object`,
   `#Adj`, `#Time` (it's `#Date`/`#Time`… check the list). When in doubt, grep [docs/tags.md](docs/tags.md).

3. **The match-syntax is not regex.** It matches whole words/terms. `+ * ? . ^ $` mean term-level
   things; for character-level patterns use a `/regex/` token. See [docs/match-syntax.md](docs/match-syntax.md).

4. **Sentences are the ceiling.** Matches don't cross sentence boundaries. Use the
   [paragraphs plugin](plugins/paragraphs) for multi-sentence matching.

5. **`compromise` is the full build.** Import `compromise` (or `compromise/three`) to get
   `.people()`, `.numbers()`, `.verbs()`, etc. `compromise/two` has tags but no named selections;
   `compromise/tokenize` (`/one`) has no tags at all.

## Not supported (don't try)

- Nested match groups: `'(modern (major|minor))? general'` — chain `.match()` calls instead.
- A grammar/dependency parse tree — transforms are heuristic.
- Slash-joined matching — `nlp('eats/shoots/leaves')` splits on the slash.

## Plugins & extension

```js
nlp.plugin({
  words: { kermit: 'FirstName' },         // add lexicon entries
  tags:  { Muppet: { isA: 'Person' } },   // extend the tagset graph
  api:   (View) => { View.prototype.myMethod = function () { return this } },
})
```
Or the lightweight forms: `nlp(text, { kermit: 'FirstName' })` and `nlp.addWords({...})`.
Official plugins live in [`plugins/`](plugins) (dates, stats, syllables, wikipedia, paragraphs).

## Debugging a wrong result

```js
doc.debug()        // prints how every word was tagged — start here
doc.json()         // full structured data
nlp.verbose(true)  // log the tagger's decision-making
```

## Repo / contributor notes

- Source is layered `src/1-one` → `src/4-four` (tokenize → tags → selections → sense). The default
  entry is `src/three.js`.
- Tests: `npm test` (tape). Build: `npm run build` (rollup). Lint: `npm run lint`.
- Regenerate the machine docs after changing types or the tagset: `node ./scripts/docs.js`
  (writes `docs/tags.md`, `docs/api.md`, `llms-full.txt`). The other docs are hand-written.
