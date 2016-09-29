//these are regexes applied to t.text, instead of t.normal
module.exports = [

  ['^#[a-z]+', 'HashTag'],
  ['[a-z]s\'', 'Possessive'],
  ['[0-9,\.]+', 'Numeric'], //like 5
  ['[12]?[0-9](:[0-5][0-9])? ?(am|pm)', 'Time'], //4pm
  ['[12]?[0-9](:[0-5][0-9]) ?(am|pm)?', 'Time'], //4:00pm
  ['[PMCE]ST', 'Time'], //PST, time zone abbrevs
  ['utc ?[\+\-]?[0-9]\+?', 'Time'], //UTC 8+
  ['[a-z0-9]*? o\'?clock', 'Time'], //3 oclock
  ['[0-9]{1,4}/[0-9]{1,2}/[0-9]{1,4}', 'Date'], //03/02/89
  ['[0-9]{1,4}-[0-9]{1,2}-[0-9]{1,4}', 'Date'], //03-02-89

  // const prepositions = '(by|before|after|at|@|about)';
  // const ampm = '[12]?[0-9](:[0-5][0-9])? ?(am|pm)'; //4pm
  // const time = '[12]?[0-9](:[0-5][0-9]) ?(am|pm)?'; //4:00pm
  // const timezone = '([pmce]st|(eastern|central|mountain|pacific)( standard)?( time)?|utc[ \+\-]*[0-9])';
  // const oclock = `[a-z0-9]*? o'?clock`; //3 oclock
  // const time_of_day = '\\b(morning|noon|afternoon|evening|night|breakfast|lunch(time)?|dinner|supper)\\b';


].map(function(a) {
  return {
    reg: new RegExp('^' + a[0] + '$'),
    tag: a[1],
    str: a[0]
  };
});
