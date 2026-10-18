/* eslint-disable no-console */
import { execSync } from 'node:child_process'
import { statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const root = new URL('../../../', import.meta.url)
const tiers = ['one', 'two', 'three']
const json = process.argv.includes('--json')

// Send build output to stderr so stdout remains usable as JSON.
execSync('pnpm run build', {
  cwd: fileURLToPath(root),
  stdio: ['ignore', 2, 2],
})

const sizes = tiers.map(tier => {
  const file = new URL(`builds/${tier}/compromise-${tier}.cjs`, root)
  return statSync(file).size
})

if (json) {
  const result = Object.fromEntries(tiers.map((tier, i) => [`${tier}Bytes`, sizes[i]]))
  console.log(JSON.stringify(result, null, 2))
} else {
  tiers.forEach((tier, i) => {
    console.log(`${tier}: ${(sizes[i] / 1024).toFixed(2)} Kb`)
  })
}
