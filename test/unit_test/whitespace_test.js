var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;

test('=Whitespace=', function(T) {

  T.test('preserve whitespace:', function(t) {
    [
      'John Smith',
      'John   Smith',
      'John Smith  ',
      'John   Smith  ',
      ' John',
      ' John   Smith  ',
      //no joins
      'he is nice',
      'he   is nice',
      'he   is   nice',
      'he   is   nice  ',
      '  he   is   nice  ',
      //contractions
      `he isn't nice`,
      `he  isn't nice`,
      `he isn't  nice`,
      `he isn't     nice   `,
      `    he   isn't     nice   `,
      //multiples
      'it is ipso facto',
      'it is ipso facto  ',
      'it is   ipso facto  ',
      'it is   ipso    facto  ',
      '2nd of march, 2015'
    ].forEach(function (a) {
      var str = nlp.sentence(a).text();
      str_test(str, a, a, t);
    });
    t.end();
  });

  T.test('inter-sentence whitespace:', function(t) {
    [
      'John Smith is nice.',
      '   John Smith is nice.',
      '   John Smith is nice.   ',
      'John Smith is nice. He lives in Spain.',
      'John Smith is nice.    He lives in Spain.',
      'John Smith is nice.    He lives in Spain.  ',
      '    John Smith is nice.    He lives in Spain.  ',
      'Dr. Smith is nice.  He lives in Spain.  ',
      '    Dr. Smith is nice.    He lives in Spain.  ',
      'Dr. Smith is nice?  He lives in Spain.  ',
      '    Dr. Smith is nice?    He lives in Spain?  ',
      '    Dr. Smith is nice?    He lives in UCLA?  He does? ',
      '    Dr. Smith is nice?    He lives in Spain?  He does?? ',
    ].forEach(function (a) {
      var str = nlp.text(a).text();
      str_test(str, a, a, t);
    });
    t.end();
  });

  T.test('contraction whitespace:', function(t) {
    [
      ['John\'s    nice.', 'John is    nice.'],
      ['John Smith\'s    nice.', 'John Smith is    nice.'],
      ['John isn\'t    nice.', 'John is not    nice.'],
      ['John didn\'t    go.', 'John did not    go.'],
      ['I wanna    go.', 'I want to    go.'],
      ['they\'ve    gone.', 'they have    gone.'],
    ].forEach(function (a) {
      var str = nlp.text(a[0]).contractions.expand().text();
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });


});
