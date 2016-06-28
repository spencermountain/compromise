var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;

test('==Person==', function(T) {

  T.test('honourific:', function(t) {
    [
      ['John Smith', null],
      ['dr. John Smith', 'dr'],
      ['John Smith jr.', 'jr'],
      ['John Jacob Smith', null],
      ['Jani K. Smith', null],
      ['asdfefs', null]
    ].forEach(function (a) {
      var str = nlp.person(a[0]).honourific;
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test('firstName:', function(t) {
    [
      ['John Smith', 'John'],
      ['dr. John Smith', 'John'],
      ['Ann-Marie Smith-O\'Brien jr.', 'Ann-Marie'],
      ['John Jacob Smith-o\'brien', 'John'],
      ['Jani K. Smith', 'Jani'],
      ['Ann-Marie', 'Ann-Marie'],
      ['asdfefs', null]
    ].forEach(function (a) {
      var str = nlp.person(a[0]).firstName;
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test('lastName:', function(t) {
    [
      ['John Smith', 'Smith'],
      ['dr. John Smith', 'Smith'],
      ['John Smith jr.', 'Smith'],
      ['John Jacob mcdonald-williams', 'McDonald-Williams'],
      ['Jani-Lee K. o\'brien-macneil', 'O\'Brien-MacNeil'],
    ].forEach(function (a) {
      var str = nlp.person(a[0]).lastName;
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test('gender():', function(t) {
    [
      ['John Smith', 'Male'],
      ['dr. John Smith', 'Male'],
      ['Jane Doe', 'Female'],
      ['Jane', 'Female'],
      // ambiguous gender
      ['Jan Smith', null],
      ['Jan', null],
      //unknown name
      ['Jani K. Smith', 'Female'],
      ['Jani', null],
      ['asdfefs', null]
    ].forEach(function (a) {
      var str = nlp.person(a[0]).gender();
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

});
