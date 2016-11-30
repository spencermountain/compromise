var test = require('tape');
var nlp = require('../lib/nlp');
var str_test = require('../lib/fns').str_test;

test('==Inflect==', function(T) {

  T.test('toPlural():', function(t) {
    [
      ['cranberry', 'cranberries'],
      ['a cranberry', 'the cranberries'],
      ['a red cranberry', 'the red cranberries'],
      ['mayor of chicago', 'mayors of chicago'],
      ['chicago mayor', 'chicago mayors'],
    ].forEach(function (a) {
      var str = nlp(a[0]).toPlural().normal();
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

});
