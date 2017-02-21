var test = require('tape');
var nlp = require('../lib/nlp');

test('topk:', function (t) {
  var str = 'it is good. it was nice. she is cool.';
  var r = nlp(str);
  var arr = r.verbs().out('topk');
  t.equal(arr[0].normal, 'is', '#1 is');
  t.equal(arr[0].count, 2, 'two is count');

  t.equal(arr[1].normal, 'was', 'one was count');
  t.equal(arr[1].count, 1, 'one was count');
  t.end();
});

test('out-tags:', function (t) {
  var str = 'texas rangers are a baseball team';
  var r = nlp(str);
  var arr = r.out('tags');
  t.equal(arr.length, 5, '5 terms');
  t.equal(arr[0].normal, 'texas rangers', 'texas rangers are #1');
  t.equal(arr[1].normal, 'are', 'are #2');
  t.ok(arr[0].tags.indexOf('SportsTeam') !== -1, 'they are a sportsteam');
  t.end();
});

test('out-array:', function (t) {
  var str = 'texas rangers are a baseball team. They do not play in houston.';
  var r = nlp(str).verbs();
  var arr = r.out('array');
  t.equal(arr.length, 2, '2 verbs');
  t.equal(arr[0], 'are', 'are #1');
  t.equal(arr[1], 'do not play', 'do not play #2');
  t.end();
});

test('out-others:', function (t) {
  var str = 'texas rangers are a baseball team. They do not play in houston.';
  var r = nlp(str).verbs();
  var txt = r.out('text');
  t.notEqual(r.out('html'), txt, 'html-out');
  t.notEqual(r.out('grid'), txt, 'grid-out');
  t.notEqual(r.out('root'), txt, 'grid-out');
  t.notEqual(r.out('color'), txt, 'color-out');
  t.notEqual(r.out('tags'), txt, 'tags-out');
  t.end();
});
