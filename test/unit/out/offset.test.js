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

test('index-output:', function (t) {
  var str = `I am the very model of a modern Major-General. I've information vegetable, animal, and mineral`;
  let arr = nlp(str).match('model').out('index');
  t.equal(arr[0].term, 4, 'which term');
  t.equal(arr[0].sentence, 0, 'which sentence');
  t.equal(arr[0].sentenceTerm, 4, 'which sentence-term');

  arr = nlp(str).match('vegetable').out('index');
  t.equal(arr[0].term, 13, 'which term');
  t.equal(arr[0].sentence, 1, 'which sentence');
  t.equal(arr[0].sentenceTerm, 3, 'which sentence-term');
  t.end();
});

test('offset-with-whitespace:', function (t) {
  var str = `I am the very model of a modern Major-General. I've information vegetable, animal, and mineral`;
  let place = nlp(str).match('animal').first().out('offset')[0];

  //full term offset
  let substr = str.substring(place.offset, place.offset + place.length);
  t.equal(substr, ' animal,', 'offset+length');

  //no-punctuation or whitespace offset
  substr = str.substring(place.wordStart, place.wordEnd);
  t.equal(substr, 'animal', 'wordStart-wordEnd');
  t.end();
});
