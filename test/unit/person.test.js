var test = require('tape');
var nlp = require('./lib/nlp');

test('==.person()==', function(T) {

  T.test('tricky names:', function(t) {
    [
      'john stewart',
      'martha stewart',
      'dr. martin luther king',
    ].forEach((a) => {
      var str = nlp(a).people().plaintext();
      var msg = '\'' + a + '\'  becomes \'' + str + '\'';
      t.equal(str, a, msg);
    });
    t.end();
  });

});
