//these are regexes applied to t.text, instead of t.normal
module.exports = [
  //589-3809
  [/^[0-9]{3}-[0-9]{4}$/, 'PhoneNumber'],
  //632-589-3809
  [/^[0-9]{3}[ -]?[0-9]{3}-[0-9]{4}$/, 'PhoneNumber'],

  //dates/times
  [/^[012]?[0-9](:[0-5][0-9])(:[0-5][0-9])$/, 'Time'], //4:32:32
  [/^[012]?[0-9](:[0-5][0-9])?(:[0-5][0-9])? ?(am|pm)$/, 'Time'], //4pm
  [/^[012]?[0-9](:[0-5][0-9])(:[0-5][0-9])? ?(am|pm)?$/, 'Time'], //4:00pm
  [/^[PMCE]ST$/, 'Time'], //PST, time zone abbrevs
  [/^utc ?[+-]?[0-9]+?$/, 'Time'], //UTC 8+
  [/^[a-z0-9]*? o\'?clock$/, 'Time'], //3 oclock
  [/^[0-9]{1,4}-[0-9]{1,2}-[0-9]{1,4}$/, 'Date'], // 03-02-89
  [/^[0-9]{1,4}\/[0-9]{1,2}\/[0-9]{1,4}$/, 'Date'], // 03/02/89

  //names
  [/^ma?c\'.*/, 'LastName'], //mc'adams
  [/^o\'[drlkn].*/, 'LastName'], //o'douggan
  [/^ma?cd[aeiou]/, 'LastName'], //macdonell - Last patterns https://en.wikipedia.org/wiki/List_of_family_name_affixes

  //web tags
  [/^\w+@\w+\.[a-z]{2,3}$/, 'Email'], //not fancy
  [/^#[a-z0-9_\u00C0-\u00FF]{2,}$/, 'HashTag'],
  [/^@\w{2,}$/, 'AtMention'],
  [/^(https?:\/\/|www\.)\w+\.[a-z]{2,3}/, 'Url'], //with http/www
  [/^[\w\.\/]+\.(com|net|gov|org|ly|edu|info|biz|ru|jp|de|in|uk|br)/, 'Url'], //http://mostpopularwebsites.net/top-level-domain

  //slang things
  [/^(lol)+[sz]$/, 'Expression'], //lol
  [/^(un|de|re)\\-[a-z\u00C0-\u00FF]{2}/, 'Verb'],
  [/^[\-\+]?[0-9]+(\.[0-9])*$/, 'NumericValue'],
  [/^(over|under)[a-z]{2,}/, 'Adjective'],
  [/^[0-9]{1,4}\.[0-9]{1,2}\.[0-9]{1,4}$/, 'Date'], // 03-02-89

  //numbers
  [/^[\-\+]?[0-9][0-9,]*(\.[0-9])*$/, ['Cardinal', 'NumericValue']], //like 5
  [/^[-+]?[0-9]+(.[0-9]+)?$/, ['Cardinal', 'NumericValue']], //like +5.0
  [/^[0-9\.]{1,4}(st|nd|rd|th)?[-–][0-9\.]{1,4}(st|nd|rd|th)?$/, 'NumberRange'], //5-7
  [/^[-+]?[0-9.,]{1,3}(,[0-9.,]{3})+(.[0-9]+)?$/, 'NiceNumber'], //like 5,999.0
  [/^.?[0-9]+([0-9,.]+)?%$/, ['Percent', 'Cardinal', 'NumericValue']], //7%  ..
  [/^[0-9]{1,4}\/[0-9]{1,4}$/, 'Fraction'], //3/2ths
  [/^[0-9\.]{1,2}[-–][0-9]{1,2}$/, ['Value', 'NumberRange']], //7-8
  [/^[0-9]+([a-z]{1,2})$/, 'Value'], //like 5kg
  [/^[0-9][0-9,\.]*(st|nd|rd|r?th)$/, ['NumericValue', 'Ordinal']], //like 5th
  [/[0-9]\+$/, ['Cardinal', 'NumericValue']], //10+

  //money
  [/^[-+]?[$€¥£][0-9]+(.[0-9]{1,2})?$/, ['Money', 'Value']], //like $5.30
  [/^[-+]?[$€¥£][0-9]{1,3}(,[0-9]{3})+(.[0-9]{1,2})?$/, ['Money', 'Value']], //like $5,231.30
]
