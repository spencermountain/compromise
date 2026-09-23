# Auxiliary conversion internals

The public verb methods and the shapes returned by `.parse()` and `.json()` are
unchanged. Passive, perfect, modal perfect, and nested going-to constructions
use a private pipeline:

1. `src/3-three/verbs/api/parse/auxiliary.js` reads the auxiliary words, finite
   auxiliary, voice, and perfect/progressive aspect from the existing parse.
2. `src/3-three/verbs/api/conjugate/auxiliary.js` plans the target auxiliary chain.
3. Its writer edits anchored auxiliary terms. The lexical root, negation,
   adverbs, and surrounding punctuation remain in the document.

The writer aligns auxiliary tails from the right. For example, changing
`will not really have been driven` to present replaces `will` with `has`, removes
the auxiliary `have`, and retains `been`. It does not search the whole phrase for
words to delete: lexical `had` in `will have had tea` must survive.

## Conversion policy

- Present, past, and future conversions retain perfect/progressive aspect and
  passive voice, subject to the compatibility cases below.
- Already-target-tense constructions are left alone, including contractions.
  Contractions are expanded only when an auxiliary change is needed.
- Agreement is handled by the existing `haveHas`, `wasWere`, and `isAreAm` helpers.
- Perfect conversion preserves an already-perfect past form rather than changing
  its tense. A passive without perfect aspect gains `have/has been`.
- Modal perfect conversion preserves the modal and the complement's voice/aspect:
  `should be swimming` → `should have been swimming`,
  `ought to swim` → `ought to have swum`. Existing perfect complements are left
  alone. Lexical `have` still changes: `can have tea` → `can have had tea`.
- For going-to passive/perfect complements, tense changes affect only the finite
  head: `was going to have eaten` → `is going to have eaten`. Future retains
  present-tense going-to wording. Perfect conversion applies inside the complement:
  `is going to be driven` → `is going to have been driven`; an existing
  `is going to have eaten` remains unchanged.
- Negation and adverbs retain their order. Newly inserted active-perfect future
  auxiliaries retain the established `will have really ...` placement; passive
  auxiliaries retain `will really have been ...` placement.

## Compatibility cases

These are deliberately retained, not new grammatical recommendations:

- Simple future passive converted to past becomes past perfect:
  `will be driven` → `had been driven`. Progressive future passive becomes
  past progressive: `will be being driven` → `was/were being driven`.
- `.toPastParticiple()` leaves active future-perfect-progressive phrases unchanged.
- `got driven` retains `got` in past and becomes `will get driven` in future.

Simple verbs, modal/conditional tense changes, and non-perfect progressives still
use their existing handlers. This includes the established simple/progressive
going-to conversions (`is going to swim` → `has been going to swim` for perfect).
Verb-selection rules are outside this refactor.
Extend the private model and its explicit-output test matrix before moving those
families into the shared converter.
