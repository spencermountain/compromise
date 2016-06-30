var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;


test('conditions:', function(t) {
  [
    ['if it is raining, the driveway is wet', 'the driveway is wet'],
    ['if it is raining, the driveway is wet, unless it is snowing', 'the driveway is wet'],
  ].forEach(function (a) {
    var str = nlp.sentence(a[0]).strip_conditions().text();
    str_test(str, a[0], a[1], t);
  });
  t.end();
});
