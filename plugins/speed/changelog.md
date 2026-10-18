compromise uses semver, and pushes to npm and github frequently

- **Major** is a breaking api change - method or response changes that can cause runtime errors.
- **Minor** is a behaviour change - Tagging or grammar changes.
- **Patch** is an obvious, non-controversial bugfix.

While all _Major_ releases should be reviewed, our only _large_ releases are **v6** in 2016 **v12** in 2019 and **v14** in 2022. Others have been mostly incremental.

#### 0.2.0 [Oct 2026]

- **[change]** - reuse parsed sentences in `keyPress`, with isolated editor caches and lexicon invalidation
- **[change]** - reuse worker pools with batching, local fallback, and `closeWorkerPool()`
- **[add]** - `streamFileIterator()`, async callbacks, and `{ collect: false }` for streaming without retaining results
- **[fix]** - preserve long sentences and multibyte characters across stream chunks
- **[fix]** - preserve worker result order
- **[fix]** - keep lazy matching correct for mixed rules and contractions
- **[update]** - dependencies
