# Development
The project is a pnpm workspace
* The seven maintained packages in `plugins/*` are workspace members; 
* Each maintained plugin declares `compromise: "workspace:*"` as a peer dependency.

## Commands
* `pnpm test` - Root source tests
* `pnpm testb` - Root build tests (build first)
* `pnpm build` - Root library
* `pnpm lint` - Root source lint
* `pnpm test:plugins` - Each plugin's source tests, in its own process
* `pnpm testb:plugins` - Each plugin's source tests, in its own process
* `pnpm build:plugins` - All maintained plugins
* `pnpm test:types` - Root TypeScript declarations
* `pnpm debug:word WORD` - Inspect lexical entries, prefix/suffix candidates, switch clues, and related rules
* `pnpm debug:hooks TEXT` - Print spec output after tokenization and each hook
* `pnpm debug:rules corpus.txt` - Profile postTagger rules against a text corpus
* `pnpm bench --no-save` - Run benchmarks and compare against saved history without saving a result |

For one plugin, use `pnpm --filter compromise-dates test` or
`pnpm --filter compromise-dates build`.

## Tagging diagnostics

Follow the full pipeline with `pnpm debug:hooks "They won't walk home."`.
Each row shows spec output after one hook, including unchanged stages. Spec reduces tags to
root categories; use `pnpm --silent debug:hooks "They won't walk home." --json` for full term
snapshots, or `--no-color` for plain spec output. Hooks run once, starting from raw tokenization.

Inspect a word, optionally tracing its tagging in a sentence:

```sh
pnpm debug:word chaser
pnpm debug:word walk --in 'They walk home.'
pnpm --silent debug:word walk --json
```

The default output is a compact, colored summary. Use `--no-color` for plain text or
`--json` for full details; `--silent` suppresses pnpm's command banner for JSON consumers.
Source hits and pattern/rule candidates do not prove which rule ran; use `--in` to see actual tag changes.

Find costly postTagger rules using a local corpus:

```sh
pnpm debug:rules /path/to/corpus.txt --sort miss-ms --top 20
```

This sorts by time spent on failed matches. Use `--out report.yaml` to save the full report.
Counts reflect matcher attempts and immediate tag edits, not tagging accuracy.
Both commands support `--help`.
