// parse process.argv for the compromise cli - no dependencies
const outputs = ['json', 'jsonl', 'text', 'spec', 'debug', 'highlight']
// flags that add fields to the json output
const extras = ['offsets', 'bestTag', 'confidence', 'normal', 'root']

const help = `Usage: compromise [files...] [options]

  compromise notes.txt                       parse a file (globs ok)
  echo "she sells seashells" | compromise    read text from stdin
  compromise --input="she sells seashells"   parse text from an argument

Options:
  --format=FORMAT     ${outputs.join(', ')}
                   (default: json, or jsonl for several inputs or --stream)
  --text, --debug  shorthand for --format=text, --format=debug, etc
  --offsets        add character offsets to the json
  --bestTag        add each term's single best tag to the json
  --confidence     add a confidence score per sentence to the json
  --normal, --root add normalized or root-form text to the json
  --match=PATTERN  only output the matches, e.g. --match='#Noun+'
  --if=PATTERN     only output sentences containing a match
  --has=PATTERN    like --if, but stop after the first sentence
  --width=N        trim highlight lines to N characters (default: terminal width)
  --input=TEXT     parse this text instead of a file (repeatable)
  --stream         process stdin line-by-line, as it arrives
  --version        print the library version
  --help           show this help

Output is one json document per input; multiple inputs are newline-delimited.
Text and spec output print one line per sentence (or per match).`

// '--format=json' or '--format json'
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
  const opts = { format: null, match: null, if: null, has: null, width: null, files: [], stream: false, json: {}, help: false, version: false, text: [] }
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
      opts.format = name.slice(2) // --json, --text, --spec, --debug
    } else if (extras.includes(name.slice(2))) {
      opts.json[name.slice(2)] = true
    } else if (name === '--format' || name === '--match' || name === '--if' || name === '--has' || name === '--width' || name === '--input' || name === '-i') {
      const { value, skip } = valueOf(args, i, name)
      i += skip
      if (name === '--format') {
        opts.format = value
      } else if (name === '--match') {
        opts.match = value
      } else if (name === '--if') {
        opts.if = value
      } else if (name === '--has') {
        opts.has = value
      } else if (name === '--width') {
        opts.width = parseInt(value, 10)
      } else {
        opts.text.push(value)
      }
    } else if (name.startsWith('-') && name.length > 1) {
      throw new Error(`Unknown option: ${name}`)
    } else {
      opts.files.push(arg) // a path or glob
    }
  }
  if (opts.format !== null && !outputs.includes(opts.format)) {
    throw new Error(`Unknown format '${opts.format}' - expected one of: ${outputs.join(', ')}`)
  }
  if (opts.width !== null && !(opts.width > 0)) {
    throw new Error('--width must be a positive number')
  }
  if (opts.format === 'highlight' && !opts.match && !opts.if && !opts.has) {
    throw new Error('--format=highlight needs a pattern: --match, --if or --has')
  }
  const used = Object.keys(opts.json)
  if (used.length > 0 && opts.format !== null && !opts.format.startsWith('json')) {
    throw new Error(`--${used[0]} only applies to json output`)
  }
  return opts
}

export { parseArgs, help }
