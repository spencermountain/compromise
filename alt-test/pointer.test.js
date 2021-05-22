const { get } = require('../alt/03-view/pointer')
let obj = {
  foo: ['bar', 'baz'],
  '': 0,
  'a/b': 1,
  'c%d': 2,
  'e^f': 3,
  'g|h': 4,
  'i\\j': 5,
  'k"l': 6,
  ' ': 7,
  'm~n': 8,
}

let tests = [
  ['', obj], // the whole document
  ['/foo', ['bar', 'baz']],
  ['/foo/0', 'bar'],
  ['/', 0],
  // escaping
  ['/a~1b', 1],
  ['/c%d', 2],
  ['/e^f', 3],
  ['/g|h', 4],
  ['/i\\j', 5],
  ['/k"l', 6],
  ['/ ', 7],
  ['/m~0n', 8],
  // spencer
  ['/foo/-', 'baz'],
]
for (let i = 0; i < tests.length; i += 1) {
  let res = get(tests[i][0], obj)
  res = JSON.stringify(res)
  tests[i][1] = JSON.stringify(tests[i][1])

  if (res !== tests[i][1]) {
    console.log(res, '  ---- ', tests[i][1])
  }
}
// let res = get(tests[0][0], obj)
// console.log(res)
