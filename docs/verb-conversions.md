# Auxiliary conversion internals

See the [conversion regression audit](verb-conversion-gaps.md) for the corrected
question, verb-selection, and subject-attachment cases and their coverage limits.

The public verb methods and the shapes returned by `.parse()` and `.json()` are
unchanged. Passive, progressive, perfect, modal perfect, and nested going-to constructions
use a private pipeline:

1. `src/3-three/verbs/api/parse/auxiliary.js` reads the auxiliary words, finite
   auxiliary, voice, and perfect/progressive aspect from the existing parse.
2. `src/3-three/verbs/api/conjugate/auxiliary.js` plans the target auxiliary chain.
3. Its writer edits anchored auxiliary terms. The lexical root, negation,
   adverbs, and surrounding punctuation remain in the document.

Ordinary progressive forms use this pipeline exclusively; the individual tense
converters retain only the families that the shared converter declines.
`conjugate/inflect.js` centralizes lexical root normalization and inflection,
including the past-tense fallback for verbs without a distinct participle.

The writer aligns auxiliary tails from the right. For example, changing
`will not really have been driven` to present replaces `will` with `has`, removes
the auxiliary `have`, and retains `been`. It does not search the whole phrase for
words to delete: lexical `had` in `will have had tea` must survive.

## Conversion policy

- Inverted questions use a subject-first scratch document with the same model,
  convert its leading verb group, and restore the finite auxiliary before the
  subject. This retains aspect and voice without separately conjugating the
  auxiliary and lexical verb. Positive simple questions retain do-support;
  expanded negation follows the subject, while contracted negation precedes it.
- Object wh-prefixes, including noun phrases and prepositional phrases, remain
  before the inverted auxiliary. Subject wh-phrases stay on the ordinary path.
  Inverted main predicates and other selected clauses are converted separately;
  a partial main selection is left intact. Returned selections preserve the
  same boundaries after reconstruction changes term IDs and auxiliary length.

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

Adjacent coordinated roots can share an auxiliary: `has eaten and slept` becomes
`will have eaten and slept`, and `is eating and sleeping` becomes `was eating and
sleeping`. The private coordination helper snapshots compatible roots before any
edits, converts the leading phrase once, and inflects its dependents without
adding auxiliary words. Shared negation stays on the leading phrase. Sentence
converters include these dependents when converting their first verb phrase.
The group reader in `conjugate/groups.js` is shared by question and coordination
conversion without importing either converter. Partial question selections are
checked by the coordination wrapper before reconstructing a question.

This applies to perfect, progressive, passive, modal, and simple future phrases
joined by `and` or `or`, with optional adverbs. A new subject, explicit auxiliary,
intervening object, or comma ends the group. Only selected verbs are changed;
`verbs(0)` does not implicitly select later coordinated verbs. Simple finite
coordination and prospective going-to phrases retain their existing handling.

`tests/three/verbs/coordinate-conversion.test.js` checks direct conversions,
repetition, fresh parses, and past→future paths for constructions whose aspect
and voice are preserved by both routes.

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
