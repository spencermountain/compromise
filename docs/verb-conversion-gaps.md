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

The recognizer covers initial auxiliaries and wh-prefixes with pronoun or ordinary
noun subjects. Object wh-phrases may include noun modifiers or a leading
preposition: `Which books has she read?`, `Whose car did she borrow?`, and
`In which city does she live?` retain inversion. Subject wh-phrases such as
`How many dogs were barking?` and `Which books are on the table?` retain their
subject-first order. Embedded questions remain on the ordinary conversion path;
the object noun in `which books he had read` is no longer treated as a verb.
Ambiguous or deeply nested clause attachments still rely on heuristics.

## Selection boundaries — resolved

In `Has she eaten after he arrived?`, selecting the auxiliary and main predicate
converts just `Has she eaten`; selecting `arrived` converts only the subordinate
predicate. An incomplete main selection remains unchanged while independently
selected subordinate predicates can still convert. Directly coordinated verbs
sharing the inverted auxiliary must be selected together.

The returned selection also retains those boundaries, so converting it again
does not acquire an unselected subordinate clause. Selecting a question by
sentence or by its full verb selection preserves surrounding sentences.

Tests for these cases are in `question-boundaries.test.js` and `wh-phrases.test.js`.

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
