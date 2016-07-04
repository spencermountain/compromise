var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;

test('sentence-change-tense:', function(t) {
  [
    ['john walks quickly', 'john walked quickly', 'john will walk quickly'],
    ['he is quick', 'he was quick', 'he will be quick'],
    ['the stool falls over', 'the stool fell over', 'the stool will fall over'],
    // ['i usually take the stairs', 'i usually took the stairs', 'i usually will take the stairs'],
    // ['i usually use the stairs', 'i usually used the stairs', 'i usually will use the stairs'],
    // ['cardboard is made of tree fibre', 'cardboard was made of tree fibre', 'cardboard will be made of tree fibre'],
    ['he finishes first', 'he finished first', 'he will finish first'],
    ['our house looks great', 'our house looked great', 'our house will look great'],

    //infinitives
    ['he does what he can to stop', 'he did what he could to stop', 'he will do what he can to stop'],
    ['goes to sleep', 'went to sleep', 'will go to sleep'],

    //grammatical-number
    // ['we do what we can to stop', 'we did what we could to stop', 'we will do what we can to stop'],

    //multi-sentence
    ['this is one sentence. This makes two now.', 'this was one sentence. This made two now.', 'this will be one sentence. This will make two now.'],

  //support negative
  // ['this isn\'t one sentence. This doesn\'t make two now.', 'this was not one sentence. This didn\'t make two now.', 'this won\'t be one sentence. This won\'t make two now.']
  ].forEach(function (a) {
    var s = nlp.text(a[0]);

    s.to_past();
    str_test(s.text(), a[0], a[1], t);

    s.to_future();
    str_test(s.text(), a[0], a[2], t);

    s.to_present();
    str_test(s.text(), a[0], a[0], t);

  });
  t.end();
});
