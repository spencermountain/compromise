# The `spec` format
Compromise has defined a text format for declaring and testing pos-tagging.
It is a line-oriented format designed to round-trip between **compromise** and **LLMs**.

It looks like this:
```
The dog is nice. {Det,Noun,Vb,Adj}
The flowers bloomed in spring. {Det,Plural,Past,Prep,Noun}
this sentence has no tags. #that's fine

# block-comments are supported, too
Tony Hawk rides {Person|FirstName,Person|LastName,Pres} #has both tags
```

## Why it exists

LLMs read natural language extremely well and reason about grammar well, but they
choke on words they don't know and on mangled sub-word tokens (the "how many r's in
strawberry" failure). Inline tagging like `dog#Noun` fuses a tag onto the word and
breaks the token stream, so the model has to mentally un-mangle every word before it
can read the sentence.

`spec` avoids that by keeping the two channels separate:

1. **The sentence, verbatim** — the model just reads real language.
2. **An ordered list of tags** — clean, whole tag-words in `{}` braces.

Nothing in the output is glued to a word. Every token is either real English or a
real tag name.

## Shape

One line per sentence:

```
<sentence text> {<tag>,<tag>,<tag|tag>,…}
```

- The sentence is reproduced exactly (internal whitespace and punctuation preserved),
  with leading/trailing whitespace trimmed.
- Exactly **one ASCII space** separates the last sentence character from `{`.
- Tags are **comma-separated with no spaces**, wrapped in `{ }`.
- A document of N sentences produces N lines, joined by `\n`.
- A newline in the input forces a sentence-split, so a line's text never contains one.
- A slot can hold several tags separated by a pipe (`|`). The serializer emits one tag
  per slot; pipes are for ingest, where `.testSpec()` requires the term to match all of
  them (e.g. `Noun|Plural`).
- Literal `{` `}` characters in the sentence are fine - parsers split on the **last**
  `{` in the line.
- An optional `#` **comment** may follow the tag block. It is free text, ignored on
  ingest (see below).

## Comments

A line whose first non-whitespace character is `#` is ignored entirely by both
`.fromSpec()` and `.testSpec()`, including lines with braces or tag blocks:

```plaintext
james jones {Person,Person} # inline comment

# block comment
sally jones {Person,Person}
```

A line may end with a `#` comment, after the tag block:

```
The dog is nice. {Det,Noun,Vb,Adj}     # the copula keeps its Vb slot
We'll see well-known cases. {Noun,Vb,Vb,Adv,Adj,Noun}  # contraction + hyphenate
```

- The comment is **optional**, and never produced by `out('spec')` - it exists so that
  hand-written or LLM-written specs can carry notes.
- Both `.fromSpec()` and `.testSpec()` strip it before parsing, so it affects neither
  the text nor the tags. A failing line reported by `.testSpec()` comes back without it.
- A line holds **at most one tag block and one comment, and the last of each wins.**
  The tag block is the last `{…}` on the line; the comment is a `#` directly after its
  closing `}` (with only spaces or tabs between), running to the end of the line.
- A `#` before the tag block is sentence text unless it is the first non-whitespace
  character. `the {cool} #hiking dog {Det,Adj,HashTag,Noun}` parses as written;
  `#hiking is fun {HashTag,Vb,Adj}` is a comment line and is skipped.
- An inline comment cannot contain `{` `}` - a brace inside it would be read as the tag block.
- A line with no tag block also supports a trailing comment: whitespace followed
  by `#` starts the comment, so `no braces here # note` becomes `no braces here`.

## Alignment

There is **one tag-slot per compromise term, in document order.** This is the entire
alignment contract. Punctuation is not a term — it lives in the sentence text only and
never consumes a slot.

When a `{…}` block is present, `.testSpec()` requires its slot count to equal the
term count. Shorter lists cannot match a prefix or an interior phrase, and longer
lists fail too. Use `.` for a term whose tags you do not want to check. Omitting the
whole block skips validation; it does not make individual slots optional.

compromise's own tokenizer decides what a "term" is, and that decision is the
authority for both sides of the format:

| Input | Terms | Slots |
|-------|-------|-------|
| `don't`, `I'm`, `cannot`, `it's` | 2 | surface on term 1, an empty-text term 2 carries the second tag |
| `dog's` (possessive) | 1 | possessive stays whole |
| `well-known` | 2 | hyphenates split |
| `3.5` | 1 | numbers stay whole |

So `The dog don't bark.` is five terms — `The` / `dog` / `don't` / `""` / `bark` — and
therefore five tags.

## The tag vocabulary (closed)
compromise terms carry many tags, arranged in a tree. This format reduces that nest to
one **top-level (root) tag** per term, printed as its short alias when one exists.

The world is genuinely closed - every tag in the model resolves up to one of these
roots (the list is pinned by `tests/two/spec/spec-tags.test.js`, which fails if a tag
change adds, removes, or orphans a root).

These roots print as a short alias:
* Vb (Verb)
* Adj (Adjective)
* Adv (Adverb)
* Det (Determiner)
* Val (Value)
* Expr (Expression)
* Abbr (Abbreviation)
* Addr (Address)

These roots print as-is:
* Noun
* Date
* Negative
* Acronym
* Connector
* QuestionWord
* There
* NumberRange
* Url
* Email
* PhoneNumber
* HashTag
* Emoji
* Emoticon

These *shape-attribute* roots describe how a token is written, not its part of speech.
They are skipped whenever the term has a real POS tag, so they only surface on a term
with no other tags:
* Hyphenated
* Prefix
* SlashedTerm

Plus one reserved value: `-` for a term compromise could not tag (empty tag-set). In
practice the full tagger always guesses *something*, so `-` only appears from
`nlp.tokenize()`, which skips tagging.

One more root, with caveats: `Redacted` is added by the three-build's redact plugin
(the two-build doesn't have it), and `.redact()` appends the tag after the term's
POS - so in practice it never wins a slot.

> Note: top-level tags are **lossy**. `is` → `Vb` drops `Copula`/`PresentTense`;
> `He` → `Noun` drops `Pronoun`. On ingest, compromise re-tokenizes the sentence and
> applies the coarse POS, letting its own tagger refill the sub-tags. `spec` is for
> communicating structure, not for byte-exact serialization of the full tag-set.

`Connector` is the shared root of `Preposition`, `Conjunction`, and `Condition`.
For example, `of`, `and`, and `if` all print as `Connector`. Their child tags
remain available for matching and for more precise `.testSpec()` expectations.

### Sub-tag aliases (ingest only)

These aliases name tags *below* a root, so `out('spec')` never emits them - but
`.testSpec()` accepts them, usually piped onto a root, like `Vb|Past`:
* Prep (Preposition)
* Conj (Conjunction)
* Aux (Auxiliary)
* Fut (FutureTense)
* Past (PastTense)
* Pres (PresentTense)
* Imp (Imperative)
* Ger (Gerund)
* Inf (Infinitive)
* Numeric (NumericValue)
* Phrasal (PhrasalVerb)
* Poss (Possessive)
* Prop (ProperNoun)
* Org (Organization)
* Hon (Honorific)

## Reducing a term's tag-set to one slot

A compromise term carries a *set* of hierarchical tags (e.g.
`["Verb","Copula","PresentTense"]`). The slot value is:

```
slot = rootOf( primary tag of the term )
```

- **`rootOf(tag)`** walks the tag up its `parents` chain to the top-level ancestor
  (`PresentTense` → `Verb`, `Singular` → `Noun`).
- **primary tag** = the first tag in the term's set, skipping *attribute* tags that
  describe a token's shape rather than its part of speech:

  ```
  Hyphenated, Prefix, SlashedTerm
  ```

  So `well` (`["Adverb","Hyphenated"]`) → `Adverb`, not `Hyphenated`.

compromise lists the primary part-of-speech first in a term's tag-set, so this
selection is deterministic: the same term always serializes to the same slot.

## Worked examples

```
The dog is nice. {Det,Noun,Vb,Adj}
The dog don't bark. {Det,Noun,Vb,Negative,Vb}
The dog's tail wagged. {Det,Noun,Noun,Vb}
We'll see well-known cases. {Noun,Vb,Vb,Adv,Adj,Noun}
It's a 3.5 inch disk. {Noun,Vb,Det,Val,Noun,Noun}
He cannot go. {Noun,Vb,Negative,Vb}
Visit https://nlp.com or email me@x.com today! {Noun,Url,Connector,Noun,Email,Date}
there are five hundred quick reasons. {There,Vb,Val,Val,Adj,Noun}
```

In every line, the number of tags equals the number of terms.

## Parsing (spec → doc)

Two library methods ingest the format:

```js
// strip the {} blocks, re-tokenize the text, and re-run the tagger
let doc = nlp.fromSpec(spec)

// check each line's tags against compromise's own tagger,
// logging ✅/❌ per line - returns untagged sentences and failing tagged lines
nlp.testSpec(spec)
nlp.testSpec(spec, false)        // quiet
nlp.testSpec(spec, false, true)  // throw on a failing line
```

`fromSpec()` accepts an options object, defaulting to:

```js
nlp.fromSpec(spec, { tags: 'ignore', failures: 'ignore' })
```

| Option | Behavior |
| --- | --- |
| `tags: 'ignore'` | Run the normal tagger; supplied tags do not alter the document. |
| `tags: 'use'` | Tokenize without the normal tagger, then apply positive supplied tags with inheritance. |
| `failures: 'ignore'` | Skip validation and return all text with an empty `.failures` array. |
| `failures: 'throw'` | Validate and throw on failure; otherwise return all text. |
| `failures: 'retain'` | Validate and return only failing tagged lines plus tagless lines. |

With `tags: 'use'`, `.` and negative constraints add no tags, and tagless lines
remain untagged. Validation checks the **resulting supplied tagging**, so
`use + retain` normally returns an empty document. Contradictions such as
`Noun|!Noun` can still fail. Invalid slot syntax and mismatched term counts always
throw in `use` mode, because the supplied tags cannot be assigned reliably.

```js
nlp.fromSpec('dog {Verb}', { tags: 'use' }) // dog is tagged Verb
nlp.fromSpec('dog {Verb}', { failures: 'throw' }) // normal tagging fails validation
nlp.fromSpec('dog {Verb}', { tags: 'use', failures: 'retain' }) // passes; omitted
```

`fromSpec()` is quiet by default; `verbose: true` logs validation results.
`testSpec(spec)` delegates to `fromSpec(spec, { tags: 'ignore', failures: 'retain' })`,
while retaining its legacy logging and `throwError` arguments. Both return a View,
not an array; use `.failures` when only the diagnostics are needed.

Sentences without a tag block pass without validation and remain in the returned
document, with trailing comments removed. An explicit empty `{}` block still
undergoes validation when validation is enabled. Because untagged sentences are retained, a nonempty result
does not necessarily mean validation failed; check `result.failures.length` or use
`throwError` to enforce it.

The returned document has a `failures` array, empty when validation passes:

```js
const result = nlp.testSpec('the cat slept {.,!Noun,.}', false)
result.failures.forEach(failure => console.log(failure.line, failure.message))
result.text() // document methods still work
```

Each error includes its original, one-based `line` number (counting blank and comment
lines), sentence `text`, readable `message`, and a `code`: `tags`, `length`, `syntax`,
or `match`. Term errors include a one-based `term` position, `word` (including implicit
contraction terms), `expected` slot constraints, and `actual` tags. Length errors
use numeric `expected` and `actual` term counts. One line can have multiple errors.
Tagless lines produce no errors. The array describes the original validation; it
does not update when the document is edited or carry over to derived Views.

Within a tag block, `.testSpec()` accepts these positional constraints:

| Slot | Meaning |
| --- | --- |
| `Noun` or `#Noun` | The term has this tag. Aliases such as `Vb` work too. |
| `!Noun` or `!#Noun` | The term does not have this tag. Negated aliases such as `!Vb` work too. |
| `.` | Any single term, regardless of its tags. |
| `Vb\|!Noun` | Both constraints must hold for the same term. Pipes mean **and**, not **or**. |

```js
nlp.testSpec('slept {!Noun}', false)              // passes: a verb, not a noun
nlp.testSpec('the cat slept {.,Noun,!Noun}', false) // passes: three slots, three terms
nlp.testSpec('the cat slept {Noun}', false)       // fails: one slot, three terms
nlp.testSpec('the cat slept {.,.,.,.}', false)    // fails: four slots, three terms
nlp.testSpec("she didn't walk {.,.,!Noun,.}", false) // four terms, including implicit 'not'
```

Every slot consumes exactly one term. Quantifiers (`*`, `+`, `?`), groups, and
greedy or optional slots are not supported. An empty slot is invalid; use `.`
instead. An explicit `{}` fails for nonempty text. Length mismatches are reported
in verbose output and in errors when `throwError` is enabled.

`out('spec')` still emits one tag per term. By default, `fromSpec()` extracts and
reparses the text; its options enable applying tags and validating constraints.

Both accept aliases or full tag-names, and are forgiving about LLM-style mess: blank
lines, a trailing newline, `#` comments, and preamble lines without a `{}` block won't
throw.
Parsers split each line on the **last** `{`, so braces inside the sentence are safe:

```js
const [text, tagBlock] = line.split(/\{(?=[^{]*$)/)
const tags = tagBlock
  .replace(/\}[ \t]*#.*$/, '}') // drop a trailing '# comment'
  .replace(/\}$/, '')
  .split(',')
// re-tokenize `text` into terms, assert terms.length === tags.length,
// then assign tags[i] to term[i].
```

## Producing `spec` from an LLM (minimal prompt)

> Tag each sentence's parts of speech. Output the sentence **unchanged**, a space, then
> `{}` containing a comma-separated list (no spaces) of one tag per word, in order.
> Use only these tags: Det, Noun, Vb, Adj, Adv, Prep, Conj, Val, Date, Negative, … (the
> closed vocabulary above - a pronoun is a Noun). Use `-` for a word you can't tag.
> **The number of tags must equal the number of words.** Punctuation gets no tag.

To make an LLM's term-count match compromise exactly, add one line: "split
contractions (`don't` → 2) and hyphenated words (`well-known` → 2)."

## Implementation

- Serializer: [`src/1-one/output/api/_spec.js`](../src/1-one/output/api/_spec.js)
- Dispatch: `method === 'spec'` in [`src/1-one/output/api/out.js`](../src/1-one/output/api/out.js)
- Ingest: `nlp.fromSpec()` and `nlp.testSpec()` in [`src/1-one/output/fromSpec.js`](../src/1-one/output/fromSpec.js)
- Tests: [`tests/two/spec/spec-api.test.js`](../tests/two/spec/spec-api.test.js) (format + round-trip behaviour),
  [`tests/two/spec/spec-tags.test.js`](../tests/two/spec/spec-tags.test.js) (the closed-world of tags)
