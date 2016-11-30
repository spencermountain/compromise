var test = require('tape');
var nlp = require('../lib/nlp');
var fns = require('../lib/fns');


test('sortAlpha:', function (t) {
  let str = 'John xoo, John fredman, John davis'
  let r = nlp(str)
  r = r.people()
  r.sortAlpha()
  let want = ["john davis", "john fredman", "john xoo"]
  fns.arr_test(r.asArray(), str, want, t)
  t.end();
});

test('reverse:', function (t) {
  let str = 'John xoo, John fredman, John davis'
  let r = nlp(str)
  r = r.people()
  r.sortAlpha()
  r.reverse()
  let want = ["john xoo", "john fredman", "john davis"]
  fns.arr_test(r.asArray(), str, want, t)
  t.end();
});

test('unique:', function (t) {
  let str = 'John xoo, John fredman, john xoo, John davis'
  let r = nlp(str)
  r = r.people()
  r.unique()
  let want = ["john xoo", "john fredman", "john davis"]
  fns.arr_test(r.asArray(), str, want, t)
  t.end();
});

test('topk:', function (t) {
  let str = 'John xoo, John fredman, john xoo, John davis'
  let r = nlp(str).people()
  let a = r.topk()
  t.equal(a[0].normal, 'john xoo', 'topk is sorted')
  t.equal(a[0].count, 2, 'topk finds two')
  t.end();
});
