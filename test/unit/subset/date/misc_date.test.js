var test = require('tape');
var nlp = require('../../lib/nlp');

test('short+long form', function(t) {
  var r = nlp('wednesday, january 2nd, 2016');
  var shorter = r.dates().toShortForm().out('normal');
  t.equal(shorter, 'wed jan 2nd 2016');

  var r2 = nlp('Thurs, feb 2nd, 2016');
  var longer = r2.dates().toLongForm().out('normal');
  t.equal(longer, 'thursday february 2nd 2016');


  var doc = nlp('April, June, and Sept');
  shorter = doc.dates().toShortForm().all().out('normal');
  t.equal(shorter, 'apr jun and sept', 'months-short');
  longer = doc.dates().toLongForm().all().out('normal');
  t.equal(longer, 'april june and september', 'months-longer');

  r2 = nlp('Thurs, feb 2nd, 2016');
  longer = r2.dates().toLongForm().out('normal');
  t.equal(longer, 'thursday february 2nd 2016');


  var str = nlp('April, June, and Sept').dates().toShortForm().all().out();
  t.equal('Apr, Jun, and Sept', str, 'toShortForm-comma');

  str = nlp('Apr, June, and Sept').dates().toLongForm().all().out();
  t.equal('April, June, and September', str, 'toShortForm-comma');

  doc = nlp('January 10, 2018 7:20 AM');
  var obj = doc.dates().data()[0].date;
  t.equal(obj.month, 0, 'month');
  t.equal(obj.date, 10, 'date');
  t.equal(obj.year, 2018, 'year');
  t.equal(obj.time.hour, 7, 'hour');
  t.equal(obj.time.minute, 20, 'minute');

  t.end();
});
