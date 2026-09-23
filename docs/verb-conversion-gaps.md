# Verb conversion regression audit

The cases below were reproduced in the source build and are now covered by
regression tests. This is an audit of specific failures, not an exhaustive claim
about all English questions or subject attachments.

## Inverted questions — resolved

| Input | Method | Corrected output |
|---|---|---|
| Has she eaten? | toPastTense | Had she eaten? |
| Has she eaten? | toFutureTense | Will she have eaten? |
| Did she walk? | toPresentTense | Does she walk? |
| Is she swimming? | toPastTense | Was she swimming? |
| Will they arrive? | toFutureTense | Will they arrive? |
| Why doesn’t he walk? | toPastTense | Why didn’t he walk? |

Question conversion identifies the finite auxiliary, subject, and remaining
predicate. It converts a subject-first copy using the existing verb policies,
then restores inversion. Simple lexical questions gain do-support. Contracted
negation remains before the subject; expanded negation stays after it. Generated
contractions are retagged so repeated conversion behaves like a fresh parse.

Both `.verbs()` and `.sentences()` use this path. Subject questions such as
`Who walks?` remain on the ordinary path. Selecting only part of an inverted
phrase leaves it unchanged rather than rewriting unselected words.

The recognizer covers initial auxiliaries and common wh-prefixes with pronoun or
ordinary noun subjects. Complex wh-noun phrases, embedded questions, and ambiguous
clause attachments still rely on the library's existing heuristics.

## Verb selection and subject attachment — reported cases resolved

- `Alice and Bob walk.` now selects `walk` as a verb. The recovery is restricted
  to lowercase ambiguous words after coordinated names; `Bob Walk` can still be
  a person's name.
- `The dogs near the house walk.` now recognizes the locative modifier and the
  final verb.
- In `The keys on the table are missing.`, `.verbs().subjects()` now returns
  `The keys`. Subject-initial locative modifiers no longer replace the head
  subject; comma-separated introductory material retains its previous handling.

## Agreement fixes from the preceding pass

- `You walked.` → present produces `You walk.`.
- A plural object inside an `of` phrase does not supply agreement for its singular
  head: `The box of pencils` takes `was`, `has`, and `is`, while `The boxes of
  pencils` retains plural agreement.

Tests live in `tests/three/verbs/question-conversion.test.js`,
`subject-predicate-regression.test.js`, and `subject-agreement-regression.test.js`.
They check explicit output, repeated conversion, fresh parsing, and boundary
controls alongside the existing suite.
