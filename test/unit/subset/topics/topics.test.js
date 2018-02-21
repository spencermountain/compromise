var test = require('tape');
var nlp = require('../../lib/nlp');
var str_test = require('../../lib/fns').str_test;

test('topics:', function(t) {
  [
    ['James and Tony Hawk both live in Toronto. Tony Hawk is cool.', 'tony hawk'],
    ['I live Toronto. I think Toronto is cool.', 'toronto'],
    ['The EACD united in 1972. EACD must follow regulations.', 'eacd'],
    // ['The Elkjsdflkjsdf sells hamburgers. I think the Elkjsdflkjsdf eats turky.', 'elkjsdflkjsdf'],
    ['Toronto\'s citizens love toronto!', 'toronto'],
  ].forEach(function(a) {
    var arr = nlp(a[0])
      .topics()
      .out('freq');
    str_test(arr[0].normal, a[0], a[1], t);
  });
  t.end();
});

test('topics-false-positives:', function(t) {
  var arr = [
    'somone ate her lunch',
    'everybody is dancing all night',
    'a man and a woman ate her son\'s breakfast',
    'my brother walks to school',
    `She's coming by`,
    `if she doesn't like something about    us she can keep us off`,
    ` She's it! She could be a soap opera.`,
    `she's a little dare-devil!`,
  ];
  arr.forEach(function(str, i) {
    var doc = nlp(str).topics();
    t.equal(doc.length, 0, 'topics #' + i + ' -> ' + doc.out());
  });
  t.end();
});
