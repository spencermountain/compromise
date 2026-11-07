// parse process.argv for the compromise cli - no dependencies
const outputs = ['json', 'text', 'spec', 'debug']

const help = `Usage: compromise [text] [options]

  compromise "she sells seashells"           json output (pipe to jq)
  echo "she sells seashells" | compromise    read text from stdin
  compromise --file=notes.txt --out=text     read one or more files (globs ok)

Options:
  --out=FORMAT     ${outputs.join(', ')}  (default: json)
  --match=PATTERN  only output the matches, e.g. --match='#Noun+'
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
  const opts = { out: 'json', match: null, files: [], stream: false, help: false, version: false, text: [] }
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i]
    const name = arg.split('=')[0]
    if (name === '--help' || name === '-h') {
      opts.help = true
    } else if (name === '--version' || name === '-v') {
      opts.version = true
    } else if (name === '--stream') {
      opts.stream = true
    } else if (name === '--out' || name === '--match' || name === '--file' || name === '-f') {
      const { value, skip } = valueOf(args, i, name)
      i += skip
      if (name === '--out') {
        opts.out = value
      } else if (name === '--match') {
        opts.match = value
      } else {
        opts.files.push(value)
      }
    } else if (name.startsWith('-') && name.length > 1) {
      throw new Error(`Unknown option: ${name}`)
    } else {
      opts.text.push(arg)
    }
  }
  if (!outputs.includes(opts.out)) {
    throw new Error(`Unknown output '${opts.out}' - expected one of: ${outputs.join(', ')}`)
  }
  return opts
}

export { parseArgs, help }
