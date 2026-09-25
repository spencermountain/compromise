# compromise

> A rule-based natural-language-processing library for English. Tokenizes text, tags parts-of-speech,
> and finds & transforms parts of the text. Runs offline in node and the browser, no dependencies.
> Not an LLM/neural model.

Docs below are plain markdown (the published observablehq.com notebooks do not render as readable text).

## Docs

- [Concepts](docs/concepts.md): document/View/Term model, mutability, build tiers
- [Match syntax](docs/match-syntax.md): the .match() mini-language
- [Tags](docs/tag-definitions.md): the complete part-of-speech tagset
- [Tagging-differences](docs/tagging-differences.md): ways compromise differs from other taggers
- [API](docs/api.md): every method, signature, and description
- [Recipes](docs/recipes.md): copy-paste solutions to common tasks
- [Development](docs/development.md): pnpm scripts, and conventions

## Quick mental model

```js
import nlp from 'compromise'

let doc = nlp('she sells seashells by the seashore.')  // parse → a View of the whole document
doc.verbs().toPastTense() // select verbs, transform them (mutates doc)
const str = doc.text() // 'she sold seashells by the seashore.'
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

2. **Only real tags work.** A `#Tag` that isn't in [docs/tag-definitions.md](docs/tag-definitions.md) matches **nothing,
   silently**. Frequent inventions that are NOT tags: `#Name`, `#Location`, `#Subject`, `#Object`,
   `#Adj`, `#Time` (it's `#Date`/`#Time`… check the list). When in doubt, grep [docs/tag-definitions.md](docs/tag-definitions.md).

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

## Debugging a wrong result

```js
doc.debug()        // prints how every word was tagged — start here
nlp.verbose(true)  // log the tagger's decision-making
console.log(doc.json()) // full structured data
```

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

---

# Development

Unless given specific instruction:
- Do not edit README or add documentation
- do not install or change dependencies
- do not change existing tests
- do not make a commit or PR

Work on the current branch. The user may make simultaneous changes. Verify their work is not overwritten, or ask permission before destructive git changes.

### Code style
- Write maintainable javascript, using esmodules
- Write portable ES2022+ for browers or for Node>=18
- Typescript and jsdoc are not required
- Add terse comments for maintainability
- Prefer functions assigned with const, over declarations
- Do not use unbracketed if statements
- Do not use complex, multi-line, or nested ternary operators
- Defensive try/catch blocks are not required
- File-size is always important

### Project structure
- Prefer pnpm over npm
- eslint is always configured
- Prefer small maintainable files with one purpose
- Split out utility functions into a _lib.js file or ./_lib dir
- Prefer `export default` on files with one export
- Prefer clear exports at the bottom of files
- If workflow is sequential, prefix filenames with 01-, 02-, ...
- Prefer tape-formatted tests
- Use process.env for any secrets, tokens, or keys
