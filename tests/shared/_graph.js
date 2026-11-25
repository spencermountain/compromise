import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = fileURLToPath(new URL('../../', import.meta.url))
const fromReg = /\bfrom ['"]([^'"]+)['"]/g

// every file statically reachable from this entry, as repo-relative paths
const importGraph = entry => {
  const found = { files: {}, bare: [], missing: [] }
  const walk = abs => {
    const rel = path.relative(root, abs)
    if (found.files[rel] !== undefined) {
      return
    }
    if (!fs.existsSync(abs)) {
      found.missing.push(rel)
      return
    }
    const src = fs.readFileSync(abs, 'utf8')
    found.files[rel] = src.length
    for (const m of src.matchAll(fromReg)) {
      if (m[1].startsWith('.')) {
        walk(path.resolve(path.dirname(abs), m[1]))
      } else {
        found.bare.push(m[1])
      }
    }
  }
  walk(path.resolve(root, entry))
  return found
}

export { root, importGraph }
