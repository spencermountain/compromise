---
name: pos-tagging-fixes
description: Diagnose and fix part-of-speech tagging in the compromise source repository. Choose between lexical data, ambiguity clues, indexed neighbour rules, preTagger logic, and postTagger patterns with attention to execution order, side effects, runtime, and bundle size. Use for internal tagging changes, not ordinary application-level use of compromise.
---

# Internal POS-tagging fixes

Work from the repository root. Read its AGENTS.md and preserve concurrent changes. This skill
does not authorize dependency changes, existing-test edits, commits, or PRs. If generating tests,
write cases and expectations blindly from the requested language behaviour before researching
the implementation; do not derive expected results from the current tagger.

Choose the smallest intervention that expresses the linguistic distinction at the stage where
its evidence exists. Runtime, filesize, and behavioural scope are separate costs. A one-line
switch assignment can change more behaviour than a longer contextual rule. General postTagger
rules are by far the slowest intervention; sometimes their wider context is necessary. Hand-made
preTagger loops can be fast but add substantial code for niche cases. Prefer an existing data
table or indexed rule when it expresses the same condition faithfully.

## Establish the failure

Record the input, target term, expected tags, and contrasting readings that must remain valid.
Use compromise's conventions in [tagging differences](../../docs/tagging-differences.md) and
[tag definitions](../../docs/tag-definitions.md), not a different tagger's labels. Distinguish a
wrong POS from a tokenization, contraction, entity-selection, or chunking failure. Correct tags
with a wrong `.verbs()` selection may require a selection fix rather than another tagging rule.

Reproduce with ESM imports from `./src/two.js` or `./src/three.js`. Avoid stale CommonJS builds.
Start with `node scripts/debug.js 'the failing sentence'`, or:

```js
import nlp from './src/three.js'

nlp.verbose(true)
const doc = nlp('the failing sentence')
doc.debug()
console.dir(doc.json(), { depth: null })
nlp.verbose(false)
```

Trace both the first wrong decision and the last rule to touch the term. Search verbose reason
strings with `rg` in `src/`. Logging a requested tag is not proof that it was applied:
`setTag` logs before conflict and safety checks. Inspect the actual tag set after the stage.

## Understand the sequence before editing

Check `nlp.hooks()` and the current implementations; plugin registration can change this order.
The source pipeline is assembled in [one.js](../../src/one.js), [two.js](../../src/two.js), and
[three.js](../../src/three.js). The relevant sequence is:

1. Tokenization and early contraction/normalization/index hooks prepare terms. Freeze and
   lexicon hooks seed tags before contextual disambiguation.
2. [preTagger](../../src/2-two/preTagger/compute/tagger/index.js) handles colons, then uses
   `quickSplit` for rough clauses. Its second pass attaches switch metadata, then checks case,
   suffix, regex, prefix, and year. Several heuristics only act on untagged terms; lexical tags
   can suppress them.
3. Within each clause, preTagger's third pass first handles acronyms, parent tags, neighbours,
   and noun fallback. A separate loop handles organizations, places, switches, verb type, and
   hyphens, followed by imperative and first-word logic. These loops mutate terms as they go;
   later terms can see earlier edits. `found ||=` also skips later guesses after success.
4. `contractionTwo` uses the earlier tags to resolve further contractions/possessives.
5. [postTagger](../../src/2-two/postTagger/compute/index.js) re-splits clauses, applies indexed
   left/right rules, matches the main pattern sweep, then applies its collected tag actions.
   It next matches and applies a second sweep over whole sentences, preserving comma context.
   Finally it clears caches and unfreezes terms.
6. The full build runs chunking afterward. Named selections and transforms consume these results.

Early fixes influence downstream eligibility and may be overwritten. Late fixes cannot repair
decisions already made by contraction handling or an earlier sweep. `quickSplit` uses punctuation
and current tags, so the preTagger and postTagger clause boundaries can differ. `^` and `$` refer
to a clause in the main sweep and left/right stage, but a sentence in the second sweep.

**Matching order is not a chain of retag-and-rematch operations.** Left/right rules collect all
matches before applying actions. Per term, actions are queued from word, tag, then switch indexes;
tag iteration and each bucket's order also matter. Both pattern sweeps likewise collect matches
before tagging. Later actions can overwrite earlier actions, but cannot make a previously
unmatched rule match within that same pass. Moving a dependent rule lower in the array does not
solve that dependency. The second sweep can see main-sweep output, but its rules cannot depend
on one another's new tags.

## Choose the intervention

Prefer narrowing or correcting the rule that caused the error before adding a compensating
exception elsewhere. The following is a decision guide, not a rigid ranking: evidence timing
can rule out an otherwise cheaper option.

| Intervention | Good fit | Costs and risks |
| --- | --- | --- |
| Plain lexicon entry | Missing vocabulary or a genuinely wrong default reading | Cheap lookup and compact data, but affects every occurrence; may suppress unknown-word heuristics and generate other forms. A contextual ambiguity is not solved by globally forcing one tag. |
| Lexicon switch membership | A word genuinely belongs to an existing ambiguity class across contexts | Cheap to write, broad and often noisy. Enables shared clues, inflections, prefix handling, and all later `%...%` rules. Do not add `%Noun\|Verb%` just to make one pattern eligible. |
| Existing switch clue table | A neighbour clue should apply to the whole ambiguity class | Compact and early, but affects every class member and possibly other classes through shared clue imports. Check precedence and competing readings. |
| Indexed left/right rule | A target word, tag, or existing switch can be resolved with at most one immediate neighbour on each side | Preferred compact contextual option when sufficient. Word indexing keeps scope narrow; tag and switch indexes are broader. Cannot express arbitrary spans or consume another left/right rule's output. |
| Existing preTagger pattern/heuristic | A real orthographic or morphological generalization, or evidence needed before contractionTwo | Often cheap at runtime; suffix/regex/prefix changes affect many unknown words. Respect existing guards and pass order. |
| Hand-made preTagger logic | Necessary procedural evidence that existing tables cannot express at the required early stage | Available, but niche branches and extra loops add filesize and maintenance cost. Extend a relevant pass with a tight guard before adding another scan. |
| Main postTagger pattern | Wider context, multiple target terms, optional spans, or conditions beyond left/right syntax | Most expensive route. Compiled filtering helps, but broad patterns still incur matching work across ordinary text. Scope target and context tightly. |
| Second postTagger sweep | Evidence only produced by the main sweep, or a genuine need for context across clause splits | Same costly matching machinery and later overwrite risk. Do not use it as a universal final override. |
| Frozen lexicon or tagset changes | An invariant lexical reading, or a genuinely incorrect global tag relationship | Large semantic reach. Freezing blocks conflicting corrections; changing parent/conflict relationships affects every user of those tags. Neither is an escape hatch for one sentence. |

### Lexical data and switches

Edit human-readable [data/lexicon](../../data/lexicon/index.js), including its `switches/`
lists, rather than hand-editing packed `_data.js`. Inspect duplicate entries and merge precedence.
Runtime loading is in [lexicon/index.js](../../src/2-two/preTagger/model/lexicon/index.js), with
additional direct entries in `misc.js` and `frozenLex.js` in that directory. Avoid creating a
second source of truth to bypass packing.

`pnpm pack` runs `scripts/pack.js`, regenerating both lexical and pair-model data. Check the
working tree before running it and inspect all generated diffs afterward. Do not erase unrelated
changes. Editing `data/` alone does not change the runtime lexicon until it is packed. Do not
run `pnpm build` merely to test ESM source; that also runs the version script.

Switches are metadata, not two simultaneous POS tags. `%Noun|Verb%` in a pattern matches
`term.switch`; source lexical groups use `Noun|Verb`. Loading supplies default tags and expansion
in [model/_expand](../../src/2-two/preTagger/model/_expand/index.js). `Noun|Verb` also generates
plural switch membership (`Plural|Verb`), and expansions can seed conjugations. Some prefixed
words inherit switch metadata. Check the base, plural, conjugated, and prefixed forms, plus
competing lexical entries, when adding or removing membership.

Switch clues live in [model/clues](../../src/2-two/preTagger/model/clues/index.js). The current
[resolver](../../src/2-two/preTagger/compute/tagger/3rd-pass/06-switches.js) tries right word,
left word, left tag, then right tag; tag clues prefer the most specific tag by parent depth.
Ad-hoc handlers can override that choice. Inspect shared `_noun.js`, `_verb.js`, etc. before
editing them: their changes propagate through multiple clue tables. For a word-specific
exception, an indexed word rule usually has less collateral effect.

### Indexed rules and general patterns

Use [left-right/model/by-word.js](../../src/2-two/left-right/model/by-word.js) for word-specific
conditions, `by-tag.js` for actual tag-wide generalizations, and `by-switch.js` for existing
ambiguity classes. The key selects the target and `_` marks it:

```js
// In the bucket for "open": [open] the door
'_ #Det -> #Inf'
```

The [left/right parser](../../src/2-two/left-right/model/_lib.js) accepts at most one neighbour
on each side, literal words or tags, and one-term alternatives such as `(the|a|#Poss)`.
Anchors constrain clause edges. On the right, `|` sequences actions, not alternatives:
`#Uncountable | !#Place` adds a tag then removes another. This is a restricted syntax, not the
full matcher; do not smuggle quantifiers, nested groups, or distant context into it.

General patterns live in [postTagger/model/index.js](../../src/2-two/postTagger/model/index.js)
and [second-pass.js](../../src/2-two/postTagger/model/second-pass.js). Compact fields are `m`
(match), `g` (capture group), `t` (tag), `r` (reason), `n` (notIf), and `u` (unTag).
Use a capture to retag only the intended terms; otherwise the action can cover the entire match.
Read the matcher implementation for `notIf` scope rather than guessing. Include a short example
and useful reason string. Check aliases in `postTagger/model/_lib.js`; aliases such as `#NN`
and `#Inf` are expanded by these model loaders and are not universal public tag names.

Use existing tagging helpers. `setTag` handles parent tags and incompatible tags; `safe` tagging
declines conflicts, and frozen terms resist conflicting changes. Direct `term.tags.add()` can
bypass these invariants. Do not alter conflicts or freeze a word merely to make a rule win.

## Debug stage boundaries

For difficult cases, inspect a fresh document after each hook. This diagnostic starts with
`nlp.tokenize`, which already does limited normalization/contraction work; compare its final
result with a normal `nlp(text)` parse for the actual reproducer.

```js
const staged = nlp.tokenize(text)
for (const hook of nlp.hooks()) {
  staged.compute(hook)
  console.dir({
    hook,
    terms: staged.docs.map(terms => terms.map(t => ({
      text: t.text, normal: t.normal, implicit: t.implicit,
      tags: [...t.tags], switch: t.switch, frozen: t.frozen,
    }))),
  }, { depth: null })
}
```

If the failure is inside `postTagger`, inspect before/after leftRight, the main bulkMatch and
bulkTagger, and the second sweep using temporary instrumentation or a debugger. Capture tag
arrays at that moment; retaining references to mutable terms will hide the earlier state.
Remove only your own temporary instrumentation. A pattern tested against final `nlp(text)`
tags may match even though it could not match at its real execution stage.

Inspect `nlp.model().one.lexicon[word]`, `nlp.model().two.switches[word]`, and the actual term
metadata to separate lookup, expansion, and contextual decisions. Restart Node after source
or rule-model edits: model initialization and compiled postTagger nets are cached. Avoid
cross-example contamination from `nlp.addWords`, plugins, or the second argument to `nlp()`;
these mutate the shared world in this implementation. Re-tagging an already-tagged document
is not equivalent to a fresh parse.

## Validate the scope and cost

Check the reported sentence and contrasting readings, including common uses of the same word,
relevant inflections, capitalization, punctuation/clause edges, and changed neighbour classes.
Inspect surrounding terms as well as the target: early changes can affect the rest of a clause.
Do not keep layering exceptions when the contrast set reveals a wrong underlying generalization.

Run relevant existing tests, then `pnpm test` and `pnpm lint` for a tagging change. Respect the
repository's constraints on creating or modifying tests. Compare failures with the unchanged
baseline when necessary, and report any checks that could not run.

For new general patterns or broad hot-path changes, compare `pnpm bench` before/after on the
same input (it uses `--no-save`). Inspect expensive sweep candidates with:

```sh
node scripts/bench/post-tagger/sweep-profile.js /path/to/corpus.txt --sort miss-ms --top 20
```

Use an available representative corpus; do not install dependencies or download one without
authorization. The profiler measures matcher attempts surviving early filtering and immediate
tag edits, not final accuracy. Many misses or no-op edits suggest narrowing or relocating a
rule. Do not claim a speed improvement from rule count alone, or an accuracy improvement from
edit count. Weigh added source/bundle size too, especially for procedural preTagger exceptions.

Report the chosen intervention, why cheaper/narrower alternatives were insufficient, the stage
where it runs, the contrasts preserved, and the checks performed. Keep the fix focused; leave
unrelated refactors and tagging cleanups out of it.
