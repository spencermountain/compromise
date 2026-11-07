// parse process.argv for the compromise cli - no dependencies
const outputs = ['json', 'jsonl', 'text', 'spec', 'debug']
// flags that add fields to the json output
const extras = ['offsets', 'bestTag', 'confidence', 'normal', 'root']

const help = `Usage: compromise [text] [options]

  compromise "she sells seashells"           json output (pipe to jq)
  echo "she sells seashells" | compromise    read text from stdin
  compromise --file=notes.txt --out=text     read one or more files (globs ok)

Options:
  --out=FORMAT     ${outputs.join(', ')}
                   (default: json, or jsonl for several inputs or --stream)
  --text, --debug  shorthand for --out=text, --out=debug, etc
  --offsets        add character offsets to the json
  --bestTag        add each term's single best tag to the json
  --confidence     add a confidence score per sentence to the json
  --normal, --root add normalized or root-form text to the json
  --match=PATTERN  only output the matches, e.g. --match='#Noun+'
  --if=PATTERN     only output sentences containing a match
  --has=PATTERN    like --if, but stop after the first sentence
  --file=PATH      read input from a file or glob (repeatable)
  --stream         process stdin line-by-line, as it arrives
  --version        print the library version
  --help           show this help

Output is one json document per input; multiple inputs are newline-delimited.
Text and spec output print one line per sentence (or per match).`

// '--out=json' or '--out json'
const valueOf = function (args, i, name) {
  const arg = args[i]
  if (arg.includes('=')) {
    return { value: arg.slice(arg.indexOf('=') + 1), skip: 0 }
  }
  const next = args[i + 1]
  if (next === undefined || next.startsWith('--')) {
    throw new Error(`Missing value for ${name}`)
  }
  return { value: next, skip: 1 }
}

const parseArgs = function (args) {
  const opts = { out: null, match: null, if: null, has: null, files: [], stream: false, json: {}, help: false, version: false, text: [] }
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i]
    const name = arg.split('=')[0]
    if (name === '--help' || name === '-h') {
      opts.help = true
    } else if (name === '--version' || name === '-v') {
      opts.version = true
    } else if (name === '--stream') {
      opts.stream = true
    } else if (outputs.includes(name.slice(2))) {
      opts.out = name.slice(2) // --json, --text, --spec, --debug
    } else if (extras.includes(name.slice(2))) {
      opts.json[name.slice(2)] = true
    } else if (name === '--out' || name === '--match' || name === '--if' || name === '--has' || name === '--file' || name === '-f') {
      const { value, skip } = valueOf(args, i, name)
      i += skip
      if (name === '--out') {
        opts.out = value
      } else if (name === '--match') {
        opts.match = value
      } else if (name === '--if') {
        opts.if = value
      } else if (name === '--has') {
        opts.has = value
      } else {
        opts.files.push(value)
      }
    } else if (name.startsWith('-') && name.length > 1) {
      throw new Error(`Unknown option: ${name}`)
    } else {
      opts.text.push(arg)
    }
  }
  if (opts.out !== null && !outputs.includes(opts.out)) {
    throw new Error(`Unknown output '${opts.out}' - expected one of: ${outputs.join(', ')}`)
  }
  const used = Object.keys(opts.json)
  if (used.length > 0 && opts.out !== null && !opts.out.startsWith('json')) {
    throw new Error(`--${used[0]} only applies to json output`)
  }
  return opts
}

export { parseArgs, help }
