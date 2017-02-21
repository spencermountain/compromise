var test = require('tape');
var nlp = require('../lib/nlp');

test('extend-tagset-flat', function (t) {
  var tagSet = {
    OffWhite: true
  };
  var lexicon = {
    'mother of pearl': 'OffWhite'
  };
  var arr = nlp('it is mother of pearl', lexicon, tagSet).terms().last().out('tags');
  t.equal(arr[0].text, 'mother of pearl', 'text found');
  t.equal(arr[0].tags.length, 1, 'has only one tag');
  t.ok(arr[0].tags.indexOf('OffWhite') !== -1, 'has new tag');
  t.end();
});


test('extend-tagset-nested', function (t) {
  var tagSet = {
    Noun: {
      Singular: {
        Color: {
          OffWhite: true
        }
      }
    }
  };
  var lexicon = {
    'mother of pearl': 'OffWhite'
  };
  var arr = nlp('it is mother of pearl', lexicon, tagSet).terms().last().out('tags');
  t.equal(arr[0].text, 'mother of pearl', 'text found');
  t.equal(arr[0].tags.length, 4, 'has inferred tags');
  t.ok(arr[0].tags.indexOf('OffWhite') !== -1, 'has new tag');
  t.ok(arr[0].tags.indexOf('Color') !== -1, 'has inferred color tag');
  t.ok(arr[0].tags.indexOf('Singular') !== -1, 'has inferred singular tag');
  t.ok(arr[0].tags.indexOf('Noun') !== -1, 'has inferred noun tag');
  t.end();
});
