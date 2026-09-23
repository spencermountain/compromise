# Auxiliary conversion internals

The public verb methods and the shapes returned by `.parse()` and `.json()` are
unchanged. Passive, progressive, perfect, modal perfect, and nested going-to constructions
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
  auxiliaries retain `will really have been ...` placement. Plain progressives put
  the new `be` after negation: `is not walking` → `will not be walking`.
- `.toGerund()` preserves passive voice: `will not be driven` →
  `is not being driven`. Already-progressive phrases remain unchanged, including
  perfect progressives. Negative copulas use `is not being`, not `is being not`.
- `.toInfinitive()` retains the existing finite do-support convention for
  negative lexical verbs (`does not walk`). Negative copulas instead use the
  agreeing present copula (`was not happy` → `is not happy`). Positive forms
  continue to produce the bare verb.

## Complement boundaries and regression tests

Prepositional gerunds, including passive/perfect chains such as `by being watched`
and `without having been told`, are excluded from verb selection. Coordinated
non-finite chains are excluded too; a new subject or finite verb ends the chain.
Infinitival complements beginning with `to` are protected during conversions,
including `.toInfinitive()`, even when `have` or `be` is tagged as an auxiliary.
The marker in `ought not to` is part of the modal phrase instead.

Perfect conversion of a simple going-to phrase restores `going` as a gerund and
`to` as its complement marker, so repeated conversion of `has been going to have
a car` cannot conjugate the lexical `have` separately.

`tests/three/verbs/conversion-boundaries.test.js` checks explicit expected outputs,
repeated conversions on the same document, and conversions after parsing the
expected text afresh. Both paths matter: retained tags can hide a parsing error.

## Compatibility cases

These are deliberately retained, not new grammatical recommendations:

- Simple future passive converted to past becomes past perfect:
  `will be driven` → `had been driven`. Progressive future passive becomes
  past progressive: `will be being driven` → `was/were being driven`.
- `.toPastParticiple()` leaves active future-perfect-progressive phrases unchanged.
- `got driven` retains `got` in past and becomes `will get driven` in future.

Simple verbs and modal/conditional tense changes still
use their existing handlers. This includes the established simple/progressive
going-to conversions (`is going to swim` → `has been going to swim` for perfect).
Extend the private model and its explicit-output test matrix before moving those
families into the shared converter.
