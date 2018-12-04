var test = require('tape');
var nlp = require('../../lib/nlp');

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
    //dangling start/end
    ['\'twas good cookin', ''],
    ['twas good cookin\'', ''],
    ['twas \'good cookin\'', 'good cookin'],
    ['\'twas \'good cookin\'', 'twas good cookin'],
    [`and "Dig Your own grave and Save".`, 'dig your own grave and save'],
  ];
  arr.forEach(function(a) {
    var r = nlp(a[0]);
    var str = r.quotations().out('normal');
    var msg = a[0] + '  -  ' + str;
    t.equal(str, a[1], msg);
  });
  t.end();
});

test('multiple quotation test', function(t) {
  var arr = [
    [`My "String" "with many" adjacent "nested" 'quotes'`,
      [
        'string',
        'with many',
        'nested',
        'quotes'
      ]
    ],
    [`My "String 'with manys' adjacent" "nested" 'quotes'`,
      [
        'string with manys adjacent',
        'nested',
        'quotes'
      ]
    ],
    [`"May's" 'third day' 'will be a "really cold" day' "in a" 'really cold "month"'`,
      [
        'may\'s',
        'third day',
        'will be a really cold day',
        'in a',
        'really cold month',
      ]
    ],
  ];
  arr.forEach(function(a) {
    var r = nlp(a[0]);
    var str = r.quotations().out('array');
    var msg = a[0] + '  -  ' + str;
    t.deepEqual(str, a[1], msg);
  });
  t.end();
});

test('false-positives', function(t) {
  var txt = `Probably the renovation right away from the amount of work, which has been done to the property.
  I have one two, three, four five six properties, which came on the market in the month.
  I think that the number one quite comfortable looking at the two properties, which I'm working on now.`;
  var questions = nlp(txt).sentences().isQuestion().out('array');
  t.equal(questions.length, 0, 'no questions here');
  t.end();
});
