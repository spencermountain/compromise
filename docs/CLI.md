# Command-line interface
Compromise ships a small `npx`-runnable bin for parsing text from the terminal.
It uses the full build (`compromise/three`), has no dependencies, and prints json by
default so results can be piped into `jq`.

```bash
npx compromise "she sells seashells by the seashore"
```

## Input
Text can come from an argument, from stdin, or from files:

```bash
npx compromise "the cat sat on the mat"          # argument
echo "the cat sat on the mat" | npx compromise   # stdin
npx compromise --file=notes.txt                  # a file
npx compromise --file='posts/*.md'               # a glob (node 22+)
```

* `--file` is repeatable. Each file is parsed as its own document.
* Globs use node's built-in `fs.glob`. On node 18-20 the value is treated as a literal path.
* stdin is read in full by default, so sentence boundaries survive hard-wrapped text.
* `--stream` reads stdin line-by-line and emits a result for each non-empty line as it
  arrives, for large or never-ending inputs. Each line is parsed on its own, so a sentence
  split across two lines will be read as two sentences.

## Output
`--out` picks the format. Each format is also a flag of its own, so `--text` means `--out=text`:

| format  | prints                                                        |
| ------- | ------------------------------------------------------------- |
| `json`  | `doc.json()`, pretty-printed - the default                    |
| `jsonl` | the same json on one line per input ([json lines](https://jsonlines.org)) |
| `text`  | one line per sentence (or per match)                          |
| `spec`  | the [spec format](spec-format.md) - one line per sentence      |
| `debug` | the same coloured table as `doc.debug()`                      |

```bash
npx compromise "she sells seashells" --out=spec
# she sells seashells {Noun,Vb,Noun}

npx compromise "she sells seashells" --debug
```

The json output is `doc.json()`. A few flags add fields to it, for both `json` and `jsonl`:

| flag           | adds                                                           |
| -------------- | -------------------------------------------------------------- |
| `--offsets`    | `offset: { index, start, length }` on every sentence and term  |
| `--bestTag`    | `bestTag` on every term - its single most specific tag          |
| `--confidence` | a `confidence` score per sentence                              |
| `--normal`     | a `normal` text per sentence, lowercased and cleaned           |
| `--root`       | a `root` text per sentence, with verbs and nouns un-conjugated |

```bash
npx compromise "she sells seashells" --match='#Verb' --offsets | jq '.[].offset'
# { "index": 1, "start": 4, "length": 5 }

npx compromise "she sells seashells" --bestTag | jq '.[].terms[].bestTag'
```

These flags only apply to json, and the command exits `1` if they are used with another format.

With no `--out`, a single input prints `json`. Several inputs - more than one file, a file plus
an argument, or `--stream` - print `jsonl`, one line per input, which `jq` reads natively.
Pass `--json` or `--jsonl` to pick one regardless:

```bash
cat posts/*.txt | npx compromise --stream | jq -c '.[].text'
```

## Matching
`--match` runs a [match pattern](match-syntax.md) first, and outputs only the matches:

```bash
npx compromise "she sells seashells" --match='#Noun+' --text
# she
# seashells

npx compromise "she sells seashells" --match='#Verb' | jq '.[].terms[].tags'
```

`--if` keeps whole sentences that contain a match, like `.if()` does. It runs before `--match`,
so the two can combine:

```bash
npx compromise --file=infinite-jest.txt --if='and but so' --text
# and but so she left.
# and but so it goes.

npx compromise --file=infinite-jest.txt --if='and but so' --match='#Verb' --text
```

`--has` is `--if` for the first sentence only. It stops reading input at the first hit, so
with `--stream` it returns as soon as one line matches:

```bash
npx compromise --file=infinite-jest.txt --has='and but so' --text
# and but so she left.
```

Matches stay within a sentence, like `.match()` does.

## Options
```
--out=FORMAT     json, jsonl, text, spec, debug
                 (default: json, or jsonl for several inputs or --stream)
--text, --debug  shorthand for --out=text, --out=debug, etc
--offsets        add character offsets to the json
--bestTag        add each term's single best tag to the json
--confidence     add a confidence score per sentence to the json
--normal, --root add normalized or root-form text to the json
--match=PATTERN  only output the matches
--if=PATTERN     only output sentences containing a match
--has=PATTERN    like --if, but stop after the first sentence
--file=PATH      read input from a file or glob (repeatable)
--stream         process stdin line-by-line, as it arrives
--version        print the library version
--help           show this help
```

Options accept `--out=json` or `--out json`. The command exits `1` with a message on stderr
for an unknown option or format, or a file that does not exist. With no text, files, or
piped stdin it prints the help and exits `1`.

## Development
The bin lives in [`bin/compromise.js`](../bin/compromise.js) and imports `src/three.js`
directly, so it runs from a checkout without a build:

```bash
node ./bin/compromise.js "hello world"
pnpm test:cli
```
