# Regex audit — 2026-09-20

Inspected core and plugin source, inventoried 346 regex literals (292 core,
49 regular plugins, 5 experimental plugins) and 10 `RegExp` constructor sites
across 576 JavaScript files. Generated builds, dependencies, and external
dependency implementations were excluded. This is a static review plus targeted
behavior/performance testing, not exhaustive validation of every linguistic rule.

No production changes were made. Reproduce the findings with:

```sh
node scripts/test/regex-audit.mjs --bench
```

The standalone script exits 1 while its intended-behavior assertions fail. It is
deliberately outside the existing `*.test.js` suites. Model-only tests are labeled
below; they should not be mistaken for confirmed public API failures.

Validation on Node v26.2.0:

- Core suite: **14,703 / 14,703 passed**.
- Regular plugin suites: **6,615 / 6,615 passed**.
- Configured ESLint regex rules: no findings in core, regular or experimental plugin source.
- Enabling `regexp/no-super-linear-move` additionally reports **22 warnings** in core/regular plugins. These are candidates for investigation, not 22 confirmed exploitable issues.
- Standalone audit: **13 failing assertions**, plus passing controls and candidate-fix checks.

## 1. High priority: quadratic work on ordinary input strings

Locations:

- `src/1-one/tokenize/methods/01-sentences/01-simple-split.js:3` and `:19`
- `src/2-two/preTagger/model/patterns/endsWith.js:114`

The sentence splitter searches for an unanchored punctuation run followed by
whitespace. With no whitespace, it retries the entire remaining run at each
position. The suffix rule `/[aeiou].*ist$/` similarly retries from every vowel
when the ending does not match. Both are reachable through `nlp(text)`; callers
need not supply their own regex.

Measured wall-clock time for a single warmed-up public API call in a fresh
process for each size (milliseconds; machine-dependent):

| Input | n=4,000 | n=8,000 | n=16,000 |
|---|---:|---:|---:|
| `'!'.repeat(n)` | 12.06 | 43.62 | 168.85 |
| `'a'.repeat(n) + 't'` | 16.80 | 64.35 | 249.57 |

Doubling input gives approximately four times the work. Direct calls to the
sentence splitter and suffix rules reproduce the same scaling. This can block
the event loop when processing sufficiently long, externally supplied text.

Suggested fixes:

- Scan maximal punctuation runs once and inspect the following character. Keep
  the current CJK closing-quote/bracket behavior; test both splitter branches.
- Replace the suffix pattern with `/[aeiou][^aeiou\r\n\u2028\u2029]*ist$/`.
  A successful match can start at the last vowel before `ist`, so earlier vowels
  need not consume later vowels. This preserves dot's line-terminator exclusion.
  The audit checks equivalence on 18,662 generated strings, including newlines.
- Enable `regexp/no-super-linear-move` as a warning and add timeout-bounded
  adversarial performance tests. It is not included in the current effective
  recommended checks. Inspect normalization and match-parser warnings next.

## 2. Email recognition misses common valid forms

Locations: `src/2-two/preTagger/model/regex/regex-normal.js:3` and
`src/1-one/tokenize/methods/02-terms/01-hyphens.js:22`.

Confirmed public API behavior:

| Input | Actual behavior |
|---|---|
| `alice@example.technology` | No `#Email` |
| `alice@example.info` | Tagged `#Url` instead of `#Email` |
| `alice@my-domain.com` | Tagged `#Url` instead of `#Email` |
| `first-last@example.com` | Only `last@example.com` is selected as the email |

The email pattern caps the TLD at three letters and excludes hyphens. Separately,
tokenization splits a hyphenated local part before tagging can inspect it.

Suggested fix: recognize an email-shaped token before generic hyphen splitting,
allow hyphens in local parts and domain labels, and remove the 2–3 character TLD
limit. Keep this an NLP recognition rule; full email-address validation is a
different contract. Test dotted local parts, plus addressing, multi-label domains,
and trailing punctuation alongside the failures above. A regex-only tagger fix
will not repair the hyphenated-local-part case.

## 3. URL rules both miss URLs and accept partial TLDs

Location: `src/2-two/preTagger/model/regex/regex-normal.js:4–5`.

- `nlp('x.io').has('#Url')` is false: the initial character plus `.+` requires
  at least two characters before the final dot.
- `nlp('https://my-site.xyz').has('#Url')` is false: `\w+` rejects the hyphen;
  the bare-domain fallback does not include `xyz`.
- `nlp('file.completely').has('#Url')` is true: `com` matches only a prefix of
  the apparent TLD. `notes.internal` likewise matches `in`.

Suggested fix: separate explicit-scheme recognition from bare-domain heuristics.
Allow hyphenated labels and single-character host labels. Require a hostname/TLD
boundary (end of token, path, query, fragment, or supported port syntax) after
the TLD; simply adding `$` would break URLs with paths. Remove the repeated
scheme group `+`, which unnecessarily accepts repeated prefixes.

## 4. Named capture parser consumes `>` inside the regex body

Location: `src/1-one/match/methods/parseMatch/02-parseToken.js:4`, used at `:66`.

```js
nlp('foo>bar').match('[<name>/foo>bar/]').groups('name').text()
// actual: ''; expected: 'foo>bar'
```

`\S+` greedily consumes `name>/foo`, so the regex body becomes part of the capture
name. Suggested replacement: `/^<\s*([^\s>]+)\s*>/`. Also guard the result of
`.exec()` before reading `.length`: malformed `[<oops #Noun]` currently produces
an incidental null-access TypeError. Decide explicitly whether malformed syntax
should be rejected with a useful error or treated as literal text.

## 5. Stateful compiled regexes skip terms

Location: `src/1-one/match/methods/match/term/doesMatch.js:75`.

```js
nlp('foo foo foo foo').match([{ regex: /foo/g }]).out('array')
// actual: ['foo', 'foo']; expected: four matches
```

`/foo/y` has the same problem. `.test()` mutates `lastIndex`; the next term
inherits that offset. This affects supplied compiled match objects, not the
ordinary `/foo/` string syntax, which creates a regex without these flags.

Suggested fix: define per-term regex matching to start at offset zero. For
global/sticky patterns, save `lastIndex`, reset it, test, and restore it in a
`finally` block; alternatively clone once when preparing the compiled pattern.
Test repeated calls and externally preset `lastIndex` as well as repeated terms.

## 6. Acronym normalization deletes unrelated periods

Location: `src/1-one/tokenize/compute/normal/02-acronyms.js:5`.

```js
nlp('v1.2a.b').json()[0].terms[0].normal
// actual: 'v12ab'; expected: 'v1.2a.b'
```

The unanchored lowercase-acronym pattern matches the `a.b` suffix, then removes
every period in the whole token. The other acronym patterns are also only
end-anchored. Direct testing of the helper with `'a.'.repeat(n) + '!'` showed
quadratic rejection (26/105/418 ms at n=4k/8k/16k); this helper measurement alone
does not establish the same path for already-cleaned public input.

Suggested fix: anchor whole-token acronym rules with `^` and test legitimate
acronyms, plural/possessive forms, dotted identifiers, and version-like strings.
Review the duplicated patterns in the third-pass acronym tagger, accounting for
its existing length/case guards before assigning a performance severity.

## 7. Small model-level corrections

These are confirmed directly against the model regexes, but other processing
can mask their effect in the public API.

| Location | Issue | Suggested change |
|---|---|---|
| `src/2-two/preTagger/model/regex/regex-normal.js:19` | `\\-` requires a backslash before the hyphen; the documented `un-vite` example fails this rule | Use `-`; also review whether this rule should use `term.normal`, since `term.machine` can remove the hyphen |
| `src/2-two/preTagger/model/regex/regex-normal.js:8` | Uppercase-only timezone rule is applied to lowercase normal/machine text | Add `i`, or use lowercase letters |
| `src/2-two/preTagger/methods/transform/nouns/toPlural/_rules.js:10–11` | `[m\|l]` also accepts literal `\|` | Use `[ml]` in both patterns |

The standalone audit verifies these defects and their small replacement patterns.
Existing tests passing should not be taken as evidence that the new edge cases
are handled. Run the full suites again when applying production fixes, especially
for tokenizer, URL/email, and acronym changes.
