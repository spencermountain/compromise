var test = require('tape');
var nlp = require('../lib/nlp');
var freshPrince = require('../lib/freshPrince');

test('offsets-equals-substr:', function(t) {
  var r = nlp(freshPrince);
  var arr = r.verbs().out('offsets');
  arr.forEach(function(obj) {
    var substr = freshPrince.substr(obj.offset, obj.length);
    t.equal(obj.text, substr, "'" + obj.text + "' offset " + obj.offset);
  });
  t.end();
});

test('index-output:', function(t) {
  var str = `I am the very model of a modern Major-General. I've information vegetable, animal, and mineral`;
  var arr = nlp(str).match('model').out('index');
  t.equal(arr[0].term, 4, 'which term');
  t.equal(arr[0].sentence, 0, 'which sentence');
  t.equal(arr[0].sentenceTerm, 4, 'which sentence-term');

  arr = nlp(str).match('vegetable').out('index');
  t.equal(arr[0].term, 13, 'which term');
  t.equal(arr[0].sentence, 1, 'which sentence');
  t.equal(arr[0].sentenceTerm, 3, 'which sentence-term');
  t.end();
});

test('offset-with-whitespace:', function(t) {
  var str = `I am the very model of a modern Major-General. I've information vegetable, animal, and mineral`;
  var place = nlp(str).match('animal').first().out('offset')[0];

  //full term offset
  var substr = str.substring(place.offset, place.offset + place.length);
  t.equal(substr, ' animal,', 'offset+length');

  //no-punctuation or whitespace offset
  substr = str.substring(place.wordStart, place.wordEnd);
  t.equal(substr, 'animal', 'wordStart-wordEnd');

  str = 'hello there. I work for the F.B.I. in ft. Mede. hello there!';
  var r = nlp(str);
  var o = r.sentences(1).out('offsets')[0];
  substr = str.substring(o.wordStart, o.wordEnd);
  t.equal(substr, 'I work for the F.B.I. in ft. Mede', 'keeps-internal-punctuation');

  t.end();
});
