import { ones, teens, tens, bigs, pow10 } from '../../_words.js'

// [['ninety', 90], ... ['twenty', 20]]
const tens_mapping = tens.map((w, i) => [w, (i + 2) * 10]).reverse()
// ['', 'one', ... 'nineteen']
const ones_mapping = ['', ...ones.slice(1), ...teens]

// [[1e24, 'septillion'], [1e23, 'hundred sextillion'], ... [1, 'one']]
const sequence = []
for (let i = 8; i >= 2; i -= 1) {
  sequence.push([pow10(3 * i), bigs[i]], [pow10(3 * i - 1), 'hundred ' + bigs[i - 1]])
}
sequence.push([1000, 'thousand'], [100, 'hundred'], [1, 'one'])

export { sequence, tens_mapping, ones_mapping }
