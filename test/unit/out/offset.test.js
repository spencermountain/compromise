var test = require('tape');
var nlp = require('../lib/nlp');
var freshPrince = require('../lib/freshPrince');

test('offsets-equals-substr:', function (t) {
  var r = nlp(freshPrince);
  var arr = r.verbs().out('offsets');
  arr.forEach(function(obj) {
    var substr = freshPrince.substr(obj.offset, obj.length);
    t.equal(obj.text, substr, '\'' + obj.text + '\' offset ' + obj.offset);
  });
  t.end();
});
