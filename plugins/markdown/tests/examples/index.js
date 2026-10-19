import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const dir = path.dirname(fileURLToPath(import.meta.url))

const readFile = filename => {
  return fs.readFileSync(path.join(dir, filename.endsWith('.md') ? filename : `${filename}.md`)).toString()
}

export default readFile
