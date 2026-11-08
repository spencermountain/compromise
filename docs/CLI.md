# Command-line interface
Compromise ships a small `npx`-runnable bin for parsing text from the terminal.
It uses the full build (`compromise/three`), has no dependencies, and streams: input is
read in chunks, split into sentences, and every sentence is printed as soon as it is parsed,
one json line each, so results pipe straight into `jq` or `grep`.

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

* Positional arguments are file paths. `--input` is repeatable. All of them, and stdin, are
  parsed into one stream of sentences, in order.
* Globs use node's built-in `fs.glob`. On node 18-20 the value is treated as a literal path.
* Input is read in chunks and split on sentence boundaries by the tokenizer, so a sentence
  that straddles two chunks stays whole, and a file never has to fit in memory. A few
  sentences are held back as lookahead for unbalanced quotes and brackets, so the last ones
  print at end of input. As everywhere in compromise, a line break ends a sentence.

## Output
`--format` picks the format. Each format is also a flag of its own, so `--text` means
`--format=text`. Every format prints one line per sentence, or one per match with `--match`:

| format      | prints                                                        |
| ----------- | ------------------------------------------------------------- |
| `jsonl`     | one `doc.json()` object per line - the default                |
| `text`      | the sentence text                                             |
| `spec`      | the [spec format](spec-format.md)                             |
| `debug`     | the same coloured table as `doc.debug()`                      |
| `highlight` | one line per match, in green, with its sentence in grey       |

```bash
npx compromise --input="she sells seashells" --format=spec
# she sells seashells {Noun,Vb,Noun}

npx compromise --input="she sells seashells" --debug
```

Each `jsonl` line is one sentence from `doc.json()`, or one match. A few flags add fields:

| flag           | adds                                                           |
| -------------- | -------------------------------------------------------------- |
| `--offsets`    | `offset: { index, start, length }` on the sentence and each term, counted from the start of its file |
| `--bestTag`    | `bestTag` on every term - its single most specific tag          |
| `--confidence` | a `confidence` score per sentence                              |
| `--normal`     | a `normal` text per sentence, lowercased and cleaned           |
| `--root`       | a `root` text per sentence, with verbs and nouns un-conjugated |

```bash
npx compromise --input="she sells seashells" --match='#Verb' --offsets | jq '.offset'
# { "index": 1, "start": 4, "length": 5 }

npx compromise infinite-jest.txt --bestTag | jq -r '.terms[].bestTag' | sort | uniq -c
```

These flags only apply to `jsonl`, and the command exits `1` if they are used with another
format. There is no pretty-printed json: pipe through `jq` for that.

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

`--has` is `--if` for the first sentence only. It stops reading input at the first hit, so on
a large file it returns as soon as one sentence matches:

```bash
npx compromise infinite-jest.txt --has='and but so' --text
# and but so she left.
```

`--format=highlight` prints one line per match: its sentence, with the match in green and
its neighbours in grey. It takes its pattern from `--match`, `--if` or `--has`, and a sentence
with two matches prints twice, once for each. The match always starts at the middle column,
so matches line up down the page: the words before it are trimmed or padded to 27 characters,
and the words after it are trimmed so the line fits in 55. The match itself is never trimmed.
This is the library's `.debug('highlight')`. Set `NO_COLOR` to drop the colours:

```bash
npx compromise infinite-jest.txt --highlight --match='and but so'
#       … Adult Undergarment and but so nobody at the …
#           Hal said nothing and but so Mario went on …
#                            And but so that was that.
```

Matches stay within a sentence, like `.match()` does.

## Options
```
--format=FORMAT  jsonl, text, spec, debug, highlight  (default: jsonl)
--text, --debug  shorthand for --format=text, --format=debug, etc
--offsets        add character offsets to the json
--bestTag        add each term's single best tag to the json
--confidence     add a confidence score per sentence to the json
--normal, --root add normalized or root-form text to the json
--match=PATTERN  only output the matches
--if=PATTERN     only output sentences containing a match
--has=PATTERN    like --if, but stop after the first sentence
--input=TEXT     parse this text instead of a file (repeatable)
--version        print the library version
--help           show this help
```

Options accept `--format=text` or `--format text`. The command exits `1` with a message on stderr
for an unknown option or format, or a file that does not exist. With no files, `--input`, or
piped stdin it prints the help and exits `1`.

## Development
The bin lives in [`bin/compromise.js`](../bin/compromise.js) and imports `src/three.js`
directly, so it runs from a checkout without a build. The sentence streaming in
[`bin/_lib/sentences.js`](../bin/_lib/sentences.js) is a copy of the same file in the
[speed plugin](../plugins/speed/src/_lib/sentences.js); keep the two in sync.

```bash
node ./bin/compromise.js --input="hello world"
pnpm test:cli
```
