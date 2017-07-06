var test = require('tape');
var nlp = require('../lib/nlp');
var fns = require('../lib/fns');

test('sortAlpha:', function(t) {
  var str = 'John xoo, John fredman, John davis, John fredman,';
  var r = nlp(str);
  r = r.people();
  r.sort('alpha');
  var want = ['john davis', 'john fredman', 'john fredman', 'john xoo'];
  fns.arr_test(r.out('array'), str, want, t);
  t.end();
});

test('sortChronological:', function(t) {
  var str = 'John xoo, John fredman, John davis';
  var r = nlp(str);
  r = r.people();
  r.sort('alphabetical');
  r.sort('chronological');
  var want = ['john xoo', 'john fredman', 'john davis'];
  fns.arr_test(r.out('array'), str, want, t);
  t.end();
});

test('reverse:', function(t) {
  var str = 'John xoo, John fredman, John davis';
  var r = nlp(str);
  r = r.people();
  r.sort('alphabetical');
  r.reverse();
  var want = ['john xoo', 'john fredman', 'john davis'];
  fns.arr_test(r.out('array'), str, want, t);
  t.end();
});

test('length:', function(t) {
  var str = 'Amy, John Fredman, Dr. Bill, Alexis Smithsonian';
  var r = nlp(str);
  r = r.people();
  r.sort('length');
  r.reverse();
  var want = ['amy', 'dr bill', 'john fredman', 'alexis smithsonian'];
  fns.arr_test(r.out('array'), str, want, t);
  t.end();
});

test('wordCount:', function(t) {
  var str = 'John Fredman, Amy, Dr. Bill G. Gates';
  var r = nlp(str);
  r = r.people();
  r.sort('wordCount');
  r.reverse();
  var want = ['dr bill g gates', 'john fredman', 'amy'];
  fns.arr_test(r.out('array'), str, want, t);
  t.end();
});

test('unique:', function(t) {
  var str = 'John xoo, John fredman, john xoo, John davis';
  var r = nlp(str);
  r = r.people();
  r.unique();
  var want = ['john xoo', 'john fredman', 'john davis'];
  fns.arr_test(r.out('array'), str, want, t);
  t.end();
});

test('frequency:', function(t) {
  var str = 'John xoo, John fredman, john xoo, John davis';
  var r = nlp(str).people();
  var a = r.out('frequency');
  t.equal(a[0].normal, 'john xoo', 'topk is sorted');
  t.equal(a[0].count, 2, 'topk finds two');
  t.end();
});
