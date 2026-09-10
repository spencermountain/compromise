import test from 'tape'
import { compareSizes, growthLimit } from '../scripts/filesize.js'

test('filesize growth limits', t => {
  t.equal(growthLimit(), 10, 'defaults to 10%')
  t.equal(growthLimit('0'), 0, 'allows a zero-growth budget')
  for (const value of ['', ' ', '-1', 'abc', 'Infinity']) {
    t.throws(() => growthLimit(value), /non-negative/, `rejects ${JSON.stringify(value)}`)
  }
  const baseline = Buffer.alloc(100, 'a')
  const same = compareSizes(baseline, baseline, 0)
  t.ok(same.every(row => row.percent === 0 && !row.failed), 'identical bundles pass')
  const boundary = compareSizes(baseline, Buffer.alloc(110, 'a'), 10)
  t.equal(boundary[0].failed, false, 'exactly 10% growth passes')
  const larger = compareSizes(baseline, Buffer.alloc(111, 'a'), 10)
  t.equal(larger[0].failed, true, 'raw growth above budget fails')
  const lessCompressible = Buffer.from(Array.from({ length: 100 }, (_, i) => i))
  const compressed = compareSizes(baseline, lessCompressible, 10)
  t.equal(compressed[0].failed, false, 'equal raw size passes')
  t.equal(compressed[1].failed, true, 'gzip growth is checked independently')
  const smaller = compareSizes(baseline, Buffer.alloc(50, 'a'), 0)
  t.ok(smaller.every(row => !row.failed), 'size reductions pass')
  t.throws(() => compareSizes(Buffer.alloc(0), baseline, 10), /empty baseline/, 'rejects empty baseline')
  t.end()
})
