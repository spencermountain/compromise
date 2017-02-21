var test = require('tape');
var nlp = require('../lib/nlp');

test('quotation test', function(t) {
  var arr = [
    ['so I said "nah forget it"', 'nah forget it'],
    ['so I said "nah, forget it" go home to bel-air!', 'nah forget it'],
    ['so I said \'nah, forget it\' go home to bel-air!', 'nah forget it'],
    ['so I said "nah" go home to bel-air!', 'nah'],
    ['so \'as if\' i said', 'as if'],
    ['the \'truthiness\' i said', 'truthiness'],
    ['yeah, “fun” and stuff', 'fun'],
    ['“Fun” and stuff', 'fun'],
  ];
  arr.forEach(function (a) {
    var r = nlp(a[0]);
    var str = r.quotations().out('normal');
    var msg = a[0] + '  -  ' + str;
    t.equal(str, a[1], msg);
  });
  t.end();
});
