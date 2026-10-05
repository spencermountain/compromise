# Post tagger

Contextual part-of-speech corrections applied after lexicon and preTagger tagging.
Rules use the full match engine and can inspect longer phrases, ambiguity
switches, punctuation and surrounding tags.

## Pipeline

`plugin.js` registers the model, compute functions, API methods and `postTagger`
hook. `compute/index.js` runs these stages:

1. Split sentences into clauses using `quickSplit`.
2. Run the [left-right tagger](../left-right/README.md) on those clauses.
3. Match the main sweep against the resulting clause tags, then apply its actions.
4. Match the second sweep against the resulting **whole sentences**, then apply
   its actions.
5. Clear the View's cache and unfreeze its terms.

The main rule list is assembled in `model/index.js` as `two.matches`. Its files
group rules by subject: verbs, nouns, dates, adjectives, people, and so on.
`model/second-pass.js` holds later corrections and includes `model/connectors.js`.

Both sweeps compile their match networks lazily and reuse them. They operate on
term arrays and pointers without constructing a View for each match. Editing a
rule list after its network has compiled does not rebuild that network; restart
the process when experimenting with model changes.

## Rule format

```js
// found it [interesting]
{
  match: 'found it #Adverb? [%Adj|Gerund%]',
  group: 0,
  tag: 'Adjective',
  reason: 'found-it-ger',
},
```

| Field | Meaning |
| --- | --- |
| `match` | A match-syntax string describing the phrase |
| `group` | Zero-based bracketed capture to change; omit to change the full match |
| `tag` | Tag or tags to apply to the selected terms |
| `unTag` | Tag to remove from the selected terms, after `tag` |
| `reason` | Short identifier included in tagging diagnostics |
| `notIf` | Reject when this pattern occurs anywhere inside the full matched span, before selecting `group` |
| `ifNo` | Word/tag cache key, or array of keys, used to reject indexed candidates when present anywhere in the current clause or sentence |
| `safe` | Avoid conflicting tags; also skip a selected span ending with a hyphen |
| `freeze` | Freeze the selected terms after tagging them |
| `chunk` | Set the selected terms' `chunk` field |
| `hook` | Optional indexing hint: a required literal word, `#Tag`, or `%Switch%` in the match |

Keep a short example comment above each rule, with brackets around the terms it
changes. `reason` helps locate the rule in verbose output.

### Tag actions

```js
tag: 'Person'                     // same tag on every selected term
tag: ['Honorific', 'Person']      // apply both tags to every selected term
tag: '#Verb #Preposition'         // positional tags for a two-term selection
tag: '#FirstName . #LastName'     // leave the middle term alone
```

An array of tags and a positional tag string have different meanings. Standard
tag hierarchy and conflict handling apply. A plain `tag: 'Noun'` also infers
`Singular` or `Plural` for the last selected term.

A rule may contain just `unTag`, or both `tag` and `unTag`. These are separate
fields here; the left-right `-> #Tag | !#Tag` syntax is not sweep syntax.

## Matching and ordering

See [match syntax](../../../docs/match-syntax.md) for the full language. Common
forms include words, `#Tag`, `(one|two)`, `%Noun|Verb%`, bracketed captures,
optional/repeated terms, `&&` conditions and `@` term properties. Switches refer
to ambiguity metadata, not an OR of ordinary tags.

Each sweep collects **all matches before applying any actions**. A rule cannot
enable another match in the same sweep. The second sweep can see changes made by
the first, but its own rules also share a single incoming state.

Actions run in the sweep's collected order, and later actions can overwrite
earlier tags. This is not simply one loop over the source array: indexed
candidates are ordered by their first matching hook and position within that
hook's bucket. Rules without indexable requirements run last. Preserve ordering
when consolidating rules, and check overlapping cases.

Anchors refer to the current input span:

- In the main sweep, `^` and `$` refer to **clause** boundaries. `quickSplit` can
  split at commas, colons and semicolons, with contextual exceptions.
- In the second sweep, they refer to **sentence** boundaries. A match can retain
  comma context, but cannot cross into another sentence.

## Limitations and choosing a stage

- Rules are heuristic corrections, not a grammar or dependency parser.
- Match syntax is term-based, not regular-expression syntax. Nested alternative
  groups are not supported.
- `ifNo` is a coarse candidate prefilter, not a match pattern or a test restricted
  to the selected capture. Unindexed fallback rules only receive a length check;
  use `notIf` for exclusions within a matched phrase.
- Keep simple one-target neighbour rules in left-right when applying them earlier
  gives the intended result. Syntactic eligibility alone does not establish that.
- Use the main sweep for wider context and conditions left-right cannot express.
- Use the second sweep for corrections requiring main-sweep output or context
  across clause splits. Avoid adding another pass merely to resolve rule order.

For experiments, use `nlp.verbose(true)` to inspect tagging decisions and
`doc.debug()` to inspect final tags. Regression examples belong in
`tests/two/regression/oct-rule-cleanup.hmm.js`. Compare representative text as well
as focused examples when moving rules between stages: earlier changes can alter
which later rules match.
