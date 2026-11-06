import test from 'tape'
import nlp from '../lib.js'
const here = '[one/match/group-repeat] '

const txt = 'one two three four five six'

test('repeated and-blocks', function (t) {
  const arr = [
    // one run of terms, not many single terms
    ['(/e$/ && !four)+', ['one', 'three', 'five']],
    ['(!six && !one)+', ['two three four five']],
    ['(!six && !one)*', ['two three four five']],
    // stop for the next token, like 'foo+ bar'
    ['(!six && !one)+ five', ['two three four five']],
    ['(!six && !one)+ four', ['two three four']],
    ['one (!six && !one)+ six', [txt]],
    // anchors
    ['^(!six && !four)+', ['one two three']],
    ['(!one && !three)+$', ['four five six']],
    ['(!one && !three)+ six$', ['four five six']],
    // not repeated, without being asked
    ['(!six && !one)', ['two', 'three', 'four', 'five']],
    ['(!six && !one)?', ['two', 'three', 'four', 'five']],
    // no match
    ['(!six && !one)+ one', []],
  ]
  arr.forEach(([reg, want]) => {
    t.deepEqual(nlp(txt).match(reg).out('array'), want, here + reg)
  })
  t.end()
})

// these should act the same as 'foo+ bar'
test('repeated or-blocks stop for the next token', function (t) {
  const arr = [
    ['(one|two|three)+ three', ['one two three']],
    ['(one|two|three)+ two', ['one two']],
    ['(one|two|three)+ (three|four)', ['one two three']],
    ['(one|two|three)+ three four', ['one two three four']],
    ['(one two|three)+ three', ['one two three']],
    ['(one two|three four)+ three', ['one two three']],
    ['(one|two|three){2} three', ['one two three']],
    ['(one|two|three){1,2} four', ['two three four']],
    // the next token was never in the block
    ['(one|two|three)+ four', ['one two three four']],
    ['one (two|three)+ four', ['one two three four']],
    // an end-anchor only stops it at the end
    ['(five|six)+ six$', ['five six']],
    ['(one|two|three)+ three$', []],
    // still needs its next token
    ['(one|two|three)+ six', []],
  ]
  arr.forEach(([reg, want]) => {
    t.deepEqual(nlp(txt).match(reg).out('array'), want, here + reg)
  })
  const group = nlp(txt).match('[(one|two|three)+] three', 0)
  t.deepEqual(group.out('array'), ['one two'], here + 'capture group')
  t.end()
})

test('and-blocks with a min and max', function (t) {
  const arr = [
    ['(!six && !one){2}', ['two three', 'four five']],
    ['(!six && !one){3}', ['two three four']],
    ['(!six && !one){2,3}', ['two three four']],
    ['(!six && !one){5}', []],
    ['(!six && !one){2} six', ['four five six']],
    ['^(!six && !four){3}$', []],
  ]
  arr.forEach(([reg, want]) => {
    t.deepEqual(nlp(txt).match(reg).out('array'), want, here + reg)
  })
  t.end()
})

test('or-blocks with a min and max', function (t) {
  const arr = [
    ['(one|two|three){2}', ['one two']],
    ['(one|two|three){3}', ['one two three']],
    ['(one|two|three){4}', []],
    ['(one|two|three){1,2}', ['one two', 'three']],
    ['(one|two|three)+', ['one two three']],
    // groups with spaces
    ['(one two|three four){2}', ['one two three four']],
    ['(one two|three four){3}', []],
    ['(one two|three four)+', ['one two three four']],
  ]
  arr.forEach(([reg, want]) => {
    t.deepEqual(nlp(txt).match(reg).out('array'), want, here + reg)
  })
  t.end()
})
