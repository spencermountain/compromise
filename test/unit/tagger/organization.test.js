var test = require('tape');
var nlp = require('../lib/nlp');

test('organization test', function(t) {
  var arr = [
    'google',
    'google inc',
    'Capital One',
    'HSBC',
    'NASA',
    '7-eleven',
    'al qaeda',
    'FBI',
    'monsanto',
    'Johnson & Johnson'
    // 'Johnson & Johnson LLC',
  ];
  arr.forEach(function(str) {
    var r = nlp(str);
    var orgs = r.organizations();
    var msg = orgs.out('text') + '  -  ' + str;
    t.equal(orgs.out('text'), str, msg);
  });
  t.end();
});
