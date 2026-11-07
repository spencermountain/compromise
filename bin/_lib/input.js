import fs from 'node:fs'
import readline from 'node:readline'

// expand a path or glob into file paths (fs.glob is node 22+; older nodes get the literal path)
const expandFiles = async function (patterns) {
  const paths = []
  for (const pattern of patterns) {
    if (fs.promises.glob) {
      for await (const p of fs.promises.glob(pattern)) {
        paths.push(p)
      }
    } else {
      paths.push(pattern)
    }
  }
  if (paths.length === 0) {
    throw new Error(`No files matched: ${patterns.join(', ')}`)
  }
  return paths
}

const readAll = function (stream) {
  return new Promise((resolve, reject) => {
    let str = ''
    stream.setEncoding('utf8')
    stream.on('data', chunk => (str += chunk))
    stream.on('end', () => resolve(str))
    stream.on('error', reject)
  })
}

// yield each input as a whole document, or stdin line-by-line when streaming
const inputs = async function* (opts) {
  if (opts.text.length > 0) {
    yield opts.text.join(' ')
  }
  if (opts.files.length > 0) {
    for (const path of await expandFiles(opts.files)) {
      yield await fs.promises.readFile(path, 'utf8')
    }
  }
  const useStdin = opts.text.length === 0 && opts.files.length === 0 && !process.stdin.isTTY
  if (!useStdin) {
    return
  }
  if (opts.stream) {
    const rl = readline.createInterface({ input: process.stdin })
    for await (const line of rl) {
      if (line.trim()) {
        yield line
      }
    }
    return
  }
  yield await readAll(process.stdin)
}

export default inputs
