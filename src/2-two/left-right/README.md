# Left-right tagger

An internal tagger for rules that change one term using at most its immediate
left and right neighbours. It runs on clauses before the main postTagger sweep.

## Model

Source rules live in three files and compile into
`two.leftRight = { byWord, byTag, bySwitch }`:

```js
// model/by-word.js: select by term.normal
second: [
  // one second
  '#Cardinal _ -> #Unit',
  // second dog
  '_ #Noun -> #Ordinal',
],

// model/by-tag.js: select by an incoming tag
'#ProperNoun': [
  'in _ -> #Place',
],

// model/by-switch.js: select by the exact incoming term.switch value
'%Noun|Verb%': [
  '^ _ to -> #Imperative',
],
```

Each key has an array of rule strings. `_` is the selected term, not a wildcard
or a literal word. Only that term receives the actions. Switch keys select
ambiguity metadata; `%Noun|Verb%` does not mean “has either tag.”

## Syntax

```text
[left context] _ [right context] -> action | action
```

The brackets above indicate optional syntax; do not write them in a rule.
Both contexts may be omitted. Separate contexts and `_` with whitespace.

| Form | Meaning |
| --- | --- |
| `my _` | Left neighbour's normalized word is `my` |
| `_ #Noun` | Right neighbour has the `Noun` tag |
| `_ (before\|after\|#Noun)` | Right neighbour matches any listed word or tag |
| `^ _` | Target is first in its clause |
| `_ $` | Target is last in its clause |
| `^my _` | `my` is the first term; target is second |
| `_ #Noun$` | Noun is the last term; target is second-last |
| `^(my\|your) _ (cat\|dog)$` | Exactly three terms in the clause |
| `^ _ $` | Target is the only term in its clause |

Alternatives must be parenthesized, contain at least two choices, and have no
spaces inside them. Words and tags may be mixed. Word keys and contexts compare
directly with `term.normal`; write normalized lowercase words. Tag names are
case-sensitive. The parser checks their spelling format, not whether they exist
in the tagset.

Anchors apply to the clauses produced by `quickSplit`, not necessarily whole
sentences. That splitter can divide sentences at commas, colons and semicolons,
with exceptions for contexts such as places, dates and adjective lists.

## Actions

```js
'before _ after -> #Noun'             // add a tag
'before _ after -> !#Verb'            // remove a tag
'before _ after -> #Noun | #Prefix'   // apply both tags
'before _ after -> #Noun | !#Singular' // add, then remove
```

On the right of `->`, pipes separate ordered actions, not alternatives. Every
action runs. Normal tag hierarchy and conflict handling apply, so later actions
can undo earlier ones. Removing a tag also removes its descendant tags; frozen
terms are respected. Adding `#Noun` also infers `Singular` or `Plural`, as sweep
does. A following removal can remove that inferred tag.

## Compilation and execution

`model/_lib.js` compiles strings once when the model loads:

- Neighbours become `{ words: Set, tags: [] }` membership checks.
- Actions become an ordered array of `{ tag }` or `{ unTag }` objects.
- `start` and `end` store a distance of 0 or 1 from a clause boundary.
- Key prefixes are stripped for runtime lookup, and the source string is kept
  in `reason` for tagging diagnostics.

The runner traverses terms once to collect matches. For each term it checks the
word bucket, matching tag buckets, and then the switch bucket. It still loops
through the rules in each selected bucket; this is not a constant-time combined
lookup for all contexts.

All matches see incoming tags and switches. Actions are deferred until collection
finishes, so one rule cannot enable another left-right match during this pass.
Actions then run in collected order: document order, word rules, tag rules in the
term's tag-set iteration order, then switch rules. Array order is preserved within
each bucket. Matching does not stop after the first applicable rule.

## Limitations

- Exactly one target and at most one neighbour per side. No distant context,
  spans of multiple targets, or matches across clauses.
- No optional or repeated terms (`?`, `*`, `+`), regexes, nested alternatives,
  captures, wildcards, `&&`, negative contexts, or `@` property checks.
- Switch predicates are supported only as keys, not as neighbour contexts.
- No source syntax for sweep options such as `safe`, `notIf`, or `ifNo`.
- No contraction expansion during matching: checks use the terms and normalized
  words already present, rather than the full match engine's expansion logic.
- This is an internal model, not a public match API. Malformed source rules throw
  during compilation.

A rule fitting this syntax is not automatically safe to migrate. Left-right
actions run before sweep matching, so they can enable or suppress later rules.
Keep rules that depend on sweep timing in sweep, and test migrations against
regressions and representative text.
