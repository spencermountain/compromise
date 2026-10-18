import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../../', import.meta.url))
const options = { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }

const profile = (script, flags = []) => {
  const output = execFileSync(process.execPath, [...flags, `scripts/debug/${script}/index.js`, '--json'], options)
  return JSON.parse(output)
}

const metadata = () => {
  const commit = execFileSync('git', ['rev-parse', '--short', 'HEAD'], options).trim()
  const memoryKB = profile('memory', ['--expose-gc'])
  const filesizeBytes = profile('filesize').threeBytes
  const timestamp = new Date().toISOString().replace('T', ' ').replace(/\.\d+Z$/, ' UTC')
  return { timestamp, commit, desc: '', memoryKB, filesizeBytes }
}

export default metadata
