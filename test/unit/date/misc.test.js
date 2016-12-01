var test = require('tape');
var nlp = require('../lib/nlp');


test('one big dates', function (t) {
  let r = nlp('six years and 2 days before the start of this next wednesday january 5th 1992 at 6pm')
  let dates = r.dates().parse()
  t.equal(dates.length, 1, 'one long date')

  let o = dates[0]
  t.equal(o.punt.direction, 'backward')
  t.equal(o.punt.duration.year, 6)
  t.equal(o.punt.duration.day, 2)
  t.equal(o.section, 'start')
  t.equal(o.relative.month, 0)
  t.equal(o.relative.date, 5)
  t.equal(o.relative.weekday, 3)
  t.equal(o.relative.year, 1992)
  t.equal(o.relative.knownDate, null)
    // t.equal(o.article, a[1], msg);
  t.end();
});

test('short+long form', function (t) {
  let r = nlp('wednesday, january 2nd, 2016')
  let shorter = r.dates().toShortForm().plaintext()
  t.equal(shorter, 'wed, jan 2nd, 2016')

  let r2 = nlp('Thurs, feb 2nd, 2016')
  let longer = r2.dates().toLongForm().plaintext()
  t.equal(longer, 'Thursday, February 2nd, 2016')

  t.end();
});
