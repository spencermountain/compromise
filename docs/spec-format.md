# The `spec` format

A line-oriented format for tagging the parts of speech in a sentence, designed to
round-trip between **compromise** and **LLMs**.

```js
nlp("The dog is nice.").out('spec')
// → "The dog is nice. {Determiner,Noun,Verb,Adjective}"
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
<sentence text> {<tag>,<tag>,…}
```

- The sentence is reproduced exactly (internal whitespace and punctuation preserved),
  with leading/trailing whitespace trimmed.
- Exactly **one ASCII space** separates the last sentence character from `{`.
- Tags are **comma-separated with no spaces**, wrapped in `{ }`.
- A document of N sentences produces N lines, joined by `\n`.
- Newlines are to be removed from the sentence text.

## The core rule: one tag per term

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

### The invariant

> **`count(tags) === count(terms)`**

This single integer comparison is the correctness check. A line whose tag-count does
not equal the term-count (after the sentence is re-tokenized by compromise) is
malformed. There is no silent drift — a mismatch is always a detectable bug, which is
what makes tagging issues easy to debug.

## The tag vocabulary (closed)

Each slot is exactly one **top-level tag**. There are 27, and nothing outside this set
is ever legal:

```
Abbreviation Acronym Address Adjective Adverb Condition Conjunction Date
Determiner Email Emoji Emoticon Expression HashTag Hyphenated Negative
Noun NumberRange PhoneNumber Prefix Preposition QuestionWord SlashedTerm
There Url Value Verb
```

Plus one reserved value: `-` for a term compromise could not tag (empty tag-set).

> Note: top-level tags are **lossy**. `is` → `Verb` drops `Copula`/`PresentTense`;
> `He` → `Noun` drops `Pronoun`. On ingest, compromise re-tokenizes the sentence and
> applies the coarse POS, letting its own tagger refill the sub-tags. `spec` is for
> communicating structure, not for byte-exact serialization of the full tag-set.

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
The dog is nice. {Determiner,Noun,Verb,Adjective}
The dog don't bark. {Determiner,Noun,Verb,Negative,Verb}
The dog's tail wagged. {Determiner,Noun,Noun,Verb}
We'll see well-known cases. {Noun,Verb,Verb,Adverb,Adjective,Noun}
It's a 3.5 inch disk. {Noun,Verb,Determiner,Value,Noun,Noun}
He cannot go. {Noun,Verb,Negative,Verb}
Visit https://nlp.com or email me@x.com today! {Noun,Url,Conjunction,Noun,Email,Date}
```

In every line, the number of tags equals the number of terms.

## Parsing (spec → tags)

```js
const m = line.match(/^(.*) \{([^}]*)\}$/)
const text = m[1]
const tags = m[2] === '' ? [] : m[2].split(',')
// re-tokenize `text` into terms, assert terms.length === tags.length,
// then assign tags[i] to term[i].
```

## Producing `spec` from an LLM (minimal prompt)

> Tag each sentence's parts of speech. Output the sentence **unchanged**, a space, then
> `{}` containing a comma-separated list (no spaces) of one tag per word, in order.
> Use only these tags: Determiner, Noun, Verb, Adjective, Adverb, Preposition,
> Conjunction, Value, Negative, Pronoun→Noun, … (the 27 top-level tags). Use `-` for a
> word you can't tag. **The number of tags must equal the number of words.**
> Punctuation gets no tag.

To make an LLM's term-count match compromise exactly, add one line: "split
contractions (`don't` → 2) and hyphenated words (`well-known` → 2)."

## Implementation

- Serializer: [`src/1-one/output/api/_spec.js`](../src/1-one/output/api/_spec.js)
- Dispatch: `method === 'spec'` in [`src/1-one/output/api/out.js`](../src/1-one/output/api/out.js)
- Ingest (`spec` → a tagged doc) is not yet implemented; it is the natural next step
  for full bidirectional support.
