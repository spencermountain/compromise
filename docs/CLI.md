# Command-line interface
Compromise ships a small `npx`-runnable bin for parsing text from the terminal.
It uses the full build (`compromise/three`), has no dependencies, and prints json by
default so results can be piped into `jq`.

```bash
npx compromise ./infinite-jest.txt --if='and but so' --text
```

## Input
Text can come from files, from stdin, or from an argument:

```bash
npx compromise notes.txt                         # a file
npx compromise 'posts/*.md'                      # a glob (node 22+)
echo "the cat sat on the mat" | npx compromise   # stdin
npx compromise --input="the cat sat on the mat"  # an argument
```

* Positional arguments are file paths. Each file is parsed as its own document.
* `--input` is repeatable, and each one is its own document too.
* Globs use node's built-in `fs.glob`. On node 18-20 the value is treated as a literal path.
* stdin is read in full by default, so sentence boundaries survive hard-wrapped text.
* `--stream` reads stdin line-by-line and emits a result for each non-empty line as it
  arrives, for large or never-ending inputs. Each line is parsed on its own, so a sentence
  split across two lines will be read as two sentences.

## Output
`--format` picks the format. Each format is also a flag of its own, so `--text` means `--format=text`:

| format  | prints                                                        |
| ------- | ------------------------------------------------------------- |
| `json`  | `doc.json()`, pretty-printed - the default                    |
| `jsonl` | the same json on one line per input ([json lines](https://jsonlines.org)) |
| `text`  | one line per sentence (or per match)                          |
| `spec`  | the [spec format](spec-format.md) - one line per sentence      |
| `debug` | the same coloured table as `doc.debug()`                      |
| `highlight` | one line per match, in green, with its sentence in grey     |

```bash
npx compromise --input="she sells seashells" --format=spec
# she sells seashells {Noun,Vb,Noun}

npx compromise --input="she sells seashells" --debug
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
npx compromise --input="she sells seashells" --match='#Verb' --offsets | jq '.[].offset'
# { "index": 1, "start": 4, "length": 5 }

npx compromise --input="she sells seashells" --bestTag | jq '.[].terms[].bestTag'
```

These flags only apply to json, and the command exits `1` if they are used with another format.

With no `--format`, a single input prints `json`. Several inputs - more than one file, a file plus
an `--input`, or `--stream` - print `jsonl`, one line per input, which `jq` reads natively.
Pass `--json` or `--jsonl` to pick one regardless:

```bash
cat posts/*.txt | npx compromise --stream | jq -c '.[].text'
```

## Matching
`--match` runs a [match pattern](match-syntax.md) first, and outputs only the matches:

```bash
npx compromise --input="she sells seashells" --match='#Noun+' --text
# she
# seashells

npx compromise --input="she sells seashells" --match='#Verb' | jq '.[].terms[].tags'
```

`--if` keeps whole sentences that contain a match, like `.if()` does. It runs before `--match`,
so the two can combine:

```bash
npx compromise infinite-jest.txt --if='and but so' --text
# and but so she left.
# and but so it goes.

npx compromise infinite-jest.txt --if='and but so' --match='#Verb' --text
```

`--has` is `--if` for the first sentence only. It stops reading input at the first hit, so
with `--stream` it returns as soon as one line matches:

```bash
npx compromise infinite-jest.txt --has='and but so' --text
# and but so she left.
```

`--format=highlight` prints one line per match: its sentence, with the match in green and
its neighbours in grey. It takes its pattern from `--match`, `--if` or `--has`, and a sentence
with two matches prints twice, once for each. The match always starts at the middle column,
so matches line up down the page: the words before it are trimmed or padded to half of
`--width`, and the words after it are trimmed to the other half. `--width` defaults to 55
characters, and the match itself is never trimmed. Set `NO_COLOR` to drop the colours:

```bash
npx compromise infinite-jest.txt --highlight --match='and but so'
#       … Adult Undergarment and but so nobody at the …
#           Hal said nothing and but so Mario went on …
#                            And but so that was that.
```

Matches stay within a sentence, like `.match()` does.

## Options
```
--format=FORMAT  json, jsonl, text, spec, debug, highlight
                 (default: json, or jsonl for several inputs or --stream)
--text, --debug  shorthand for --format=text, --format=debug, etc
--offsets        add character offsets to the json
--bestTag        add each term's single best tag to the json
--confidence     add a confidence score per sentence to the json
--normal, --root add normalized or root-form text to the json
--match=PATTERN  only output the matches
--if=PATTERN     only output sentences containing a match
--has=PATTERN    like --if, but stop after the first sentence
--width=N        trim highlight lines to N characters (default: 55)
--input=TEXT     parse this text instead of a file (repeatable)
--stream         process stdin line-by-line, as it arrives
--version        print the library version
--help           show this help
```

Options accept `--format=json` or `--format json`. The command exits `1` with a message on stderr
for an unknown option or format, or a file that does not exist. With no files, `--input`, or
piped stdin it prints the help and exits `1`.

## Development
The bin lives in [`bin/compromise.js`](../bin/compromise.js) and imports `src/three.js`
directly, so it runs from a checkout without a build:

```bash
node ./bin/compromise.js --input="hello world"
pnpm test:cli
```
