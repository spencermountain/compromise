# Lexicon and word models

Run `pnpm run pack` after changing the data. It regenerates:

- `src/2-two/preTagger/model/lexicon/_data.js`: the lexicon, packed with efrt.
- `src/2-two/preTagger/model/models/_data.js`: the suffix-thumb transformation models.

Then run `pnpm test`. Packing validates source data before writing either output;
invalid entries and duplicate words or transformation inputs are errors.

## Lexicon ownership

Each word belongs to one source list in `lexicon/`. Use the appropriate switch
list for ambiguous words; for example, a word that can be a person or a common
noun belongs in `lexicon/switches/person-noun.js`.

Words must be nonempty, lowercase, and trimmed. The source validator rejects
punctuation and reserved characters (`.,0-9;!:|¦-`); efrt's strict validation also
checks that the words can be packed. Special spellings and explicit multi-tag
entries live in `src/2-two/preTagger/model/lexicon/misc.js` instead. Do not repeat
ordinary packed words there: loading the packed data would overwrite them.

Frozen phrases have an additional role: their tags are protected during parsing.
Their canonical definitions live in
`src/2-two/preTagger/model/lexicon/frozenLex.js`:

- `shared` supplies both the frozen and regular lexicons. These phrases can also
  seed plurals or conjugations; do not repeat them in `data/lexicon/` lists.
- The remaining entries supply only the frozen lexicon. Moving one into `shared`
  can introduce new derived forms, so it is a behavior change.

Startup expansion derives plurals, conjugations, comparatives, and superlatives
from selected tags. Phrasal verbs also supply their root verbs and conjugations.
A word matching a suffix heuristic is not necessarily redundant: its explicit
entry may be needed by expansion or by the conjugator's participle checks.

`scripts/pack.js` fixes the existing tag-group order because expansion currently
uses first-generated-form precedence. Preserve that order when changing the
packing format, and compare expanded lexicon values as well as parsed sentences.

## Transformation pairs

Each file in `pairs/` defines one directional mapping. Inputs must be unique;
outputs may repeat (for example, `learned` and `learnt` both map to `learn`).
Empty pairs and reserved suffix-thumb characters (`~|:,{}0-9`) are rejected.

The maintained preferences preserve the existing models:

- `enrolling`, `fulfilling`, and `instilling` recover `enroll`, `fulfill`, and
  `instill`, respectively, rather than their single-l spelling variants.
- `witty` derives `wit`; `wittiness` is not a competing row.

The learner previously kept the first row for a repeated input. Do not express
alternatives with duplicate inputs: choose and document a canonical mapping.
