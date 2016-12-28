var test = require('tape');
var nlp = require('../lib/nlp');

test('organization test', function(t) {
  var arr = [
    'google',
    'google inc',
  ];
  arr.forEach(function (str) {
    var r = nlp(str);
    var orgs = r.organizations();
    var msg = orgs.plaintext() + '  -  ' + str;
    t.equal(orgs.plaintext(), str, msg);
  });
  t.end();
});
