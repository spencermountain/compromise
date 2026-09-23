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
The locative correction uses two ordinary `group`/`tag` rules: one selects the
preposition and the other selects the verb.

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
