# The `spec` format

A line-oriented format for tagging the parts of speech in a sentence, designed to
round-trip between **compromise** and **LLMs**.

```js
nlp("The dog is nice.").out('spec')
// → "The dog is nice. {Det,Noun,Vb,Adj}"
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

## Alignment

There is **one tag-slot per compromise term, in document order.** This is the entire
alignment contract. Punctuation is not a term — it lives in the sentence text only and
never consumes a slot.

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
roots (the list is pinned by `tests/three/spec-tags.test.js`, which fails if a tag
change adds, removes, or orphans a root).

These roots print as a short alias:
* Vb (Verb)
* Adj (Adjective)
* Adv (Adverb)
* Prep (Preposition)
* Conj (Conjunction)
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
* Condition
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

### Sub-tag aliases (ingest only)

These aliases name tags *below* a root, so `out('spec')` never emits them - but
`.testSpec()` accepts them, usually piped onto a root, like `Vb|Past`:
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
Visit https://nlp.com or email me@x.com today! {Noun,Url,Conj,Noun,Email,Date}
there are five hundred quick reasons. {There,Vb,Val,Val,Adj,Noun}
```

In every line, the number of tags equals the number of terms.

## Parsing (spec → doc)

Two library methods ingest the format:

```js
// strip the {} blocks, re-tokenize the text, and re-run the tagger
let doc = nlp.fromSpec(spec)

// check each line's tags against compromise's own tagger,
// logging ✅/❌ per line - returns a doc of only the failing
// lines, so an empty doc means everything passed
nlp.testSpec(spec)
nlp.testSpec(spec, false)        // quiet
nlp.testSpec(spec, false, true)  // throw on a failing line
```

Both accept aliases or full tag-names, and are forgiving about LLM-style mess: blank
lines, a trailing newline, and preamble lines without a `{}` block won't throw.
Parsers split each line on the **last** `{`, so braces inside the sentence are safe:

```js
const [text, tagBlock] = line.split(/\{(?=[^{]*$)/)
const tags = tagBlock.replace(/\}$/, '').split(',')
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
- Tests: [`tests/two/output/spec.test.js`](../tests/two/output/spec.test.js) (format + round-trip behaviour),
  [`tests/three/spec-tags.test.js`](../tests/three/spec-tags.test.js) (the closed-world of tags)
