# Post-tagger execution

The post-tagger uses compiled rule networks. Avoid adding chains of
`view.match(...).tag(...)` to its compute hook: string patterns are parsed on
every invocation, and each call scans input and constructs result Views.

## Main rules and refinements

`src/2-two/postTagger/model/index.js` assembles the main rules. Their matches are
collected before their tag actions run. The post-tagger invokes `bulkMatch` and
`bulkTagger` directly because it does not use the result Views from `sweep()`.

`model/second-pass.js` is a flat array of corrections that inspect the main
sweep's output. `compute/second-pass.js` compiles it once, then calls `bulkMatch`
and `bulkTagger` against whole sentences. It has no custom rule metadata,
question checks, capitalization checks, sorting, or dependent subpasses.

Conditions are expressed with ordinary match syntax such as `@hasComma`,
`@hasQuestionMark`, `@isTitleCase`, and `notIf`. Sentence matching retains context
across commas for lists and polite requests; rules that need clause boundaries
match the punctuation explicitly.

All matches see the tags from the main sweep. A rule cannot depend on another
second-pass rule having already run. For example, the two corrections in
“I know that works” select different captures from the same incoming pattern,
so both can be found before either tag is applied.

Hook deduplication uses rule identity. Two rules sharing a pattern may select
different captures or apply different actions and must not collapse into one.
Compilation records hook order and the matcher's minimum pattern length. It
also builds a selective index: each rule with required hooks is indexed under
the requirement shared by the fewest rules. Rules with only alternatives remain
indexed under each alternative. The complete hooks are retained for compatibility
with older nets and for determining the original action order.
Sweeps look up candidates through this index, then restore their original order
so conflicting tag actions keep their precedence. An earlier alternative can
still determine a rule's position, even when a required hook selected it.
Candidate length, required-word, exclusion, and alternative checks share one
filtering pass.
The locative correction uses two ordinary `group`/`tag` rules: one selects the
preposition and the other selects the verb.

## Choosing a hook explicitly

Rules can override automatic selection with a `hook`:

```js
{ match: 'to [%Noun|Verb%] #Preposition', hook: 'to', group: 0, tag: 'Infinitive' }
{ match: '#Gerund #Adjective #Preposition [#PresentTense]', hook: '#Gerund', group: 0, tag: 'Noun' }
```

Use the exact required word, `#Tag`, or `%Switch%` as it appears in the compiled
pattern. The hook only selects candidates; it does not change capture selection,
tag actions, or action order. Omit it to keep automatic selection.

Compilation rejects hooks that are absent, optional, negative, or merely one
branch of an alternative. Required terms inside AND blocks are allowed. This
validation is conservative: a hook must be directly identifiable as required.

Every active post-tagger rule declares a hook. Choose the least frequent required
literal word first, then the least frequent required tag if there is no such word.
Rules with neither use a required ambiguity marker such as `%Plural|Verb%`.
Alternative-only rules are split into specific patterns so that each has a safe
required hook; for example, the standalone imperative alternatives now have
separate `go`, `stop`, `wait`, and `hurry` rules.

The initial choices use the 1,454 Penn/Universal Dependencies examples in
`tests/two/tagger/_pennSample.js`. Frequency means the number of input clauses
or sentences containing the hook immediately before the corresponding pass,
since that determines candidate selection. Unseen hooks count as zero, with
alphabetical ties. These are sample estimates, not universal English frequencies.
The benchmark corpus was not used to choose hooks.

Automatic selection counts rules sharing a hook. Explicit linguistic choices
can improve on that, but word-first selection is not guaranteed to be faster:
a common word or broad tag can be less selective than an ambiguity marker.
Compare candidate counts and warmed timings before changing the selection policy.

## Verification

Run the source suite and lint:

```sh
pnpm test
pnpm run lint
```

`tests/three/compiled-post-tagger.test.js` checks that warm post-tagging does not
parse patterns or use the public sweep result-View path, and that partial Views
remain isolated. `tests/one/match/sweep.test.js` covers distinct actions sharing a
pattern with different capture selections.

For performance work, measure short inputs as well as the full corpus in
`scripts/bench/index.js`. Pattern compilation overhead is particularly visible
on short inputs. Warm the implementation, alternate baseline and candidate
measurements, and compare complete term tags as well as the regression tests.
