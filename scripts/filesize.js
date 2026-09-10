/* eslint-disable no-console */
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { gzipSync } from 'node:zlib'

const root = fileURLToPath(new URL('../', import.meta.url))
export const bundles = [
  'builds/compromise.js',
  ...['one', 'two', 'three'].flatMap(tier =>
    ['cjs', 'mjs'].map(ext => `builds/${tier}/compromise-${tier}.${ext}`)
  ),
]

export const formatSize = bytes => {
  const units = ['B', 'kB', 'MB', 'GB']
  let unit = 0
  while (bytes >= 1000 && unit < units.length - 1) {
    bytes /= 1000
    unit += 1
  }
  return `${bytes.toFixed(unit === 0 ? 0 : 2)} ${units[unit]}`
}

export const growthLimit = (value = '10') => {
  const limit = Number(value)
  if (String(value).trim() === '' || !Number.isFinite(limit) || limit < 0) {
    throw new Error('FILESIZE_MAX_INCREASE_PERCENT must be a non-negative number')
  }
  return limit
}

export const compareSizes = (previous, current, limit) => {
  if (previous.length === 0) {
    throw new Error('Cannot compare against an empty baseline bundle')
  }
  return ['raw', 'gzip'].map(format => {
    const size = buffer => format === 'gzip' ? gzipSync(buffer, { level: 9 }).length : buffer.length
    const before = size(previous)
    const after = size(current)
    const percent = (after - before) / before * 100
    return { format, before, after, percent, failed: percent > limit }
  })
}

const main = () => {
  const limit = growthLimit(process.env.FILESIZE_MAX_INCREASE_PERCENT)
  // Read local bundles first, so a missing build fails before any network access.
  const current = bundles.map(file => fs.readFileSync(path.join(root, file)))
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'compromise-filesize-'))
  try {
    // Pack downloads the published artifact without installing or executing its code.
    const output = execFileSync('npm', [
      'pack', 'compromise@latest', '--json', '--ignore-scripts', '--pack-destination', temp,
    ], { cwd: temp, encoding: 'utf8', timeout: 120000 })
    const [pkg] = JSON.parse(output)
    execFileSync('tar', [
      '-xzf', path.join(temp, path.basename(pkg.filename)), '-C', temp,
      ...bundles.map(file => `package/${file}`),
    ], { timeout: 30000 })

    console.log(`\nBundle sizes vs compromise@${pkg.version} (npm latest)`)
    console.log(`Maximum allowed growth: ${limit}% per bundle, raw and gzip\n`)
    const rows = bundles.flatMap((file, index) => {
      const previous = fs.readFileSync(path.join(temp, 'package', file))
      return compareSizes(previous, current[index], limit).map(result => ({ file, ...result }))
    })
    console.table(rows.map(row => ({
      bundle: row.file,
      format: row.format,
      published: formatSize(row.before),
      local: formatSize(row.after),
      change: `${row.percent >= 0 ? '+' : ''}${row.percent.toFixed(2)}%`,
      result: row.failed ? 'FAIL' : 'pass',
    })))
    if (rows.some(row => row.failed)) {
      throw new Error(`Bundle size growth exceeds ${limit}%`)
    }
  } finally {
    fs.rmSync(temp, { recursive: true, force: true })
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    main()
  } catch (error) {
    console.error(`Filesize check failed: ${error.message}`)
    process.exitCode = 1
  }
}
