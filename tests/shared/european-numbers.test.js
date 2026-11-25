import test from 'tape'
import { spawnSync } from 'child_process'
import { fileURLToPath } from 'url'
import { europeanNumbers } from '../../src/shared/index.js'
const here = '[shared/european-numbers] '

const { read, write, regexes } = europeanNumbers.methods.two.europeanNumbers
// bind the methods to one language's marks
const use = locale => ({
  read: (str, pre) => read(str, pre, locale),
  write: (num, how) => write(num, how, locale),
  regexes: regexes(locale),
})
// italian, portuguese, german, spanish ..
const comma = use({ decimal: ',', group: '.', ordinal: '\\.?[ºª°]' })
// french, russian
const space = use({ decimal: ',', group: ' ' })
const english = use({ decimal: '.', group: ',' })

test('european-numbers read - decimal comma', function (t) {
  const arr = [
    ['3,50', 3.5],
    ['0,5', 0.5],
    [',5', 0.5],
    ['1.000', 1000],
    ['15.300', 15300],
    ['1.234,56', 1234.56],
    ['1.234.567', 1234567],
    ['1.234.567,89', 1234567.89],
    ['1,234', 1.234],
    // a period that can't be grouping thousands
    ['3.5', 3.5],
    ['15.30', 15.3],
    ['0.500', 0.5],
    // english-style is unmistakable with both marks
    ['1,234.56', 1234.56],
    ['1,234,567', 1234567],
    // spaces and apostrophes
    ['1 000', 1000],
    ['1 234 567,89', 1234567.89],
    ["1'000", 1000],
    ['1’234,5', 1234.5],
    // signs
    ['-5', -5],
    ['−5', -5],
    ['+5', 5],
    ['-3,5', -3.5],
    ['-€5,30', -5.3],
    ['€-5,30', -5.3],
    // trailing punctuation is not a mark
    ['1.000.', 1000],
    ['3,50,', 3.5],
    ['1/2', 0.5],
    ['1234567', 1234567],
    // not one number
    ['1.2.3', null],
    ['1.23.456', null],
    ['1 00', null],
    ['1 000.000,5', null],
    ['abc', null],
    ['', null],
  ]
  arr.forEach(a => {
    t.equal(comma.read(a[0]).num, a[1], here + `'${a[0]}'`)
  })
  t.equal(comma.read('5', '(-').num, -5, here + 'sign in the pre')
  t.equal(comma.read('covid-19').num, 19, here + 'a hyphen is not always a sign')
  t.end()
})

test('european-numbers read - decimal point', function (t) {
  const arr = [
    ['3.50', 3.5],
    ['1,000', 1000],
    ['1,234.56', 1234.56],
    ['1.234', 1.234],
    ['1.234,56', 1234.56],
    ['.5', 0.5],
    ['-$5', -5],
  ]
  arr.forEach(a => {
    t.equal(english.read(a[0]).num, a[1], here + `'${a[0]}'`)
  })
  t.end()
})

test('european-numbers read - affixes', function (t) {
  let res = comma.read('5,30€')
  t.equal(res.suffix, '€', here + 'money suffix')
  t.equal(res.currency, '€', here + 'money symbol')
  res = comma.read('R$ 1.234,56')
  t.equal(res.num, 1234.56, here + 'real')
  t.equal(res.prefix, 'R$ ', here + 'money prefix')
  t.equal(res.currency, 'R$', here + 'two-letter symbol')
  t.equal(res.hasComma, true, here + 'grouped')
  t.equal(res.group, '.', here + 'group mark')
  t.equal(res.decimal, ',', here + 'decimal mark')
  res = comma.read('3,5 %')
  t.equal(res.isPercent, true, here + 'percent')
  t.equal(res.num, 3.5, here + 'percent value')
  t.equal(comma.read('50％').isPercent, true, here + 'full-width percent')
  t.equal(comma.read('50').isPercent, false, here + 'no percent')
  res = comma.read('2ª')
  t.equal(res.ordinal, 'ª', here + 'ordinal ending')
  t.equal(res.suffix, '', here + 'ordinal is not a suffix')
  t.equal(comma.read('3.º').num, 3, here + 'dotted ordinal')
  t.equal(comma.read('9km').suffix, 'km', here + 'unit suffix')
  t.equal(comma.read('1/2').isFraction, true, here + 'fraction')
  t.equal(space.read('1 000').group, ' ', here + 'remembers the space')
  t.end()
})

test('european-numbers write', function (t) {
  t.equal(comma.write(1234.5), '1234,5', here + 'decimal comma')
  t.equal(comma.write(1234.5, { hasComma: true }), '1.234,5', here + 'grouped')
  t.equal(space.write(1234567.89, { hasComma: true }), '1 234 567,89', here + 'space-grouped')
  t.equal(english.write(1234567.89, { hasComma: true }), '1,234,567.89', here + 'english')
  t.equal(comma.write(-5), '-5', here + 'negative')
  t.equal(comma.write(-5.3, { prefix: '€' }), '-€5,3', here + 'sign before currency')
  t.equal(comma.write(0.1 + 0.2), '0,3', here + 'float noise')
  t.equal(comma.write(1e21), '1e+21', here + 'exponent')
  t.equal(comma.write(null), '', here + 'not a number')
  t.equal(comma.write(1234, { hasComma: true, decimal: '.' }), '1,234', here + 'marks never collide')
  // back out the way it came in
  const arr = ['1.234,5', '1 234,5', '3,5', '-5', '1,234.5', '5,3€', 'R$ 1.234,56', '3,5 %', "1'234"]
  arr.forEach(str => {
    const res = comma.read(str)
    t.equal(comma.write(res.num, res), str, here + `round-trip '${str}'`)
  })
  const res = comma.read('1.234,5')
  t.equal(comma.write(res.num + 1, res), '1.235,5', here + 'add one')
  t.end()
})

test('european-numbers regexes', function (t) {
  const tag = str => {
    const found = comma.regexes.find(a => a[0].test(str))
    return found ? found[1][0] : null
  }
  const arr = [
    ['3,50', 'Cardinal'],
    ['1.234.567', 'Cardinal'],
    ['1.234,56', 'Cardinal'],
    ['−5', 'Cardinal'],
    ["1'000", 'Cardinal'],
    ['3,5%', 'Percent'],
    ['-4%', 'Percent'],
    ['5,30€', 'Money'],
    ['€5,30', 'Money'],
    ['R$5,30', 'Money'],
    ['US$100', 'Money'],
    ['2ª', 'Ordinal'],
    ['3.º', 'Ordinal'],
    ['1.2.3', null],
    ['12:30', null],
    ['abc', null],
    ['3-4', null],
  ]
  arr.forEach(a => {
    t.equal(tag(a[0]), a[1], here + `'${a[0]}'`)
  })
  comma.regexes.forEach(a => {
    t.ok(a[0].test(a[2]) || a[2] === 'ordinal', here + `example '${a[2]}'`)
  })
  t.equal(english.regexes.some(a => a[1][0] === 'Ordinal'), false, here + 'no ordinals unless given')
  t.end()
})

test('european-numbers defaults', function (t) {
  t.deepEqual(europeanNumbers.model.two.europeanNumbers, { decimal: ',', group: '.', ordinal: '', loose: false, percent: [], currencies: [] }, here + 'model')
  // a language may read '7,938' as thousands
  const loose = { decimal: ',', group: ' ', loose: true }
  t.equal(read('7,938', '', loose).num, 7938, here + 'loose thousands')
  t.equal(read('7,93', '', loose).num, 7.93, here + 'loose decimal')
  t.equal(write(7939, read('7,938', '', loose), loose), '7,939', here + 'loose round-trip')
  t.equal(read('+5%').prefix, '+', here + 'keeps a plus-sign')
  t.equal(read('1.000').num, 1000, here + 'reads with a decimal-comma')
  t.equal(read('3,5').num, 3.5, here + 'decimal-comma')
  t.equal(write(1234.5, { hasComma: true }), '1.234,5', here + 'writes with a decimal-comma')
  t.equal(regexes(), regexes(), here + 'rules are built once')
  t.end()
})

// plugins are applied to one shared View, so use a fresh process
test('european-numbers on a tokenize-only build', function (t) {
  const file = fileURLToPath(new URL('./_european.js', import.meta.url))
  const res = spawnSync(process.execPath, [file], { encoding: 'utf8' })
  t.equal(res.status, 0, here + 'runs' + res.stderr)
  const out = JSON.parse(res.stdout || '{}')
  t.equal(out.before, false, here + 'build starts without number tags')
  t.deepEqual(out.values, ['1.234,56', '3,5%', '5,30€', '-5', '2ª'], here + 'tags numbers')
  t.deepEqual(out.percent, ['3,5%'], here + 'tags percentages')
  t.deepEqual(out.money, ['5,30€'], here + 'tags money')
  t.deepEqual(out.ordinal, ['2ª'], here + 'uses the ordinal from the model')
  t.deepEqual(out.nums, [1234.56, 3.5, 5.3, -5, 2], here + 'reads them')
  t.deepEqual(out.kept, ['12.05.2020'], here + 'leaves dates alone')
  t.equal(out.french, '1 234,5', here + 'a language sets its own marks')
  t.deepEqual(out.spacedMoney, ['5,30', 'mille', '12', '7'], here + 'money beside a currency')
  t.deepEqual(out.currency, ['€', 'euro', 'CHF', 'USD'], here + 'tags the currency')
  t.deepEqual(out.spacedPercent, ['3,5', 'cinquanta'], here + 'percent beside its word')
  t.deepEqual(out.cento, false, here + "'cento' is not a second number")
  t.deepEqual(out.plain, [], here + 'no money without a currency')
  t.end()
})
