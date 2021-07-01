export default [
  //web tags
  [/^[\w\.]+@[\w\.]+\.[a-z]{2,3}$/, 'Email'],
  [/^#[a-z0-9_\u00C0-\u00FF]{2,}$/, 'HashTag'],
  [/^@1?[0-9](am|pm)$/i, 'Time'],
  [/^@1?[0-9]:[0-9]{2}(am|pm)?$/i, 'Time'],
  [/^@\w{2,}$/, 'AtMention'],
  [/^(https?:\/\/|www\.)+\w+\.[a-z]{2,3}/, 'Url'],
  [/^[a-z0-9./].+\.(com|net|gov|org|ly|edu|info|biz|dev|ru|jp|de|in|uk|br|io|ai)/, 'Url'],

  //dates/times
  [/^'[0-9]{2}$/, 'Year'],
  [/^[012]?[0-9](:[0-5][0-9])(:[0-5][0-9])$/, 'Time'],
  [/^[012]?[0-9](:[0-5][0-9])?(:[0-5][0-9])? ?(am|pm)$/i, 'Time'],
  [/^[012]?[0-9](:[0-5][0-9])(:[0-5][0-9])? ?(am|pm)?$/i, 'Time'],
  [/^[PMCE]ST$/, 'Time'],
  [/^utc ?[+-]?[0-9]+?$/, 'Time'],
  [/^[a-z0-9]*? o\'?clock$/, 'Time'],
  [/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}/i, 'Date'],
  [/^[0-9]{1,4}-[0-9]{1,2}-[0-9]{1,4}$/, 'Date'],
  [/^[0-9]{1,4}\/[0-9]{1,2}\/[0-9]{1,4}$/, 'Date'],
  [/^[0-9]{1,4}-[a-z]{2,9}-[0-9]{1,4}$/i, 'Date'],
  [/^gmt[+-][0-9][0-9]?$/i, 'Timezone'],
  [/^utc[+-][0-9][0-9]?$/i, 'Timezone'],

  //names
  [/^ma?c\'.*/, 'LastName'],
  [/^o\'[drlkn].*/, 'LastName'],
  [/^ma?cd[aeiou]/, 'LastName'],

  //slang things
  [/^(lol)+[sz]$/, 'Expression'],
  [/^woo+a*?h?$/, 'Expression'],
  [/^(un|de|re)\\-[a-z\u00C0-\u00FF]{2}/, 'Verb'],
  [/^[0-9]{1,4}\.[0-9]{1,2}\.[0-9]{1,4}$/, 'Date'],

  //phone numbers
  [/^[0-9]{3}-[0-9]{4}$/, 'PhoneNumber'],
  [/^(\+?[0-9][ -])?[0-9]{3}[ -]?[0-9]{3}-[0-9]{4}$/, 'PhoneNumber'],

  //money
  //like $5.30
  [
    /^[-+]?[\$\xA2-\xA5\u058F\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20BD\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6][-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?(k|m|b|bn)?\+?$/,
    ['Money', 'Value'],
  ],
  //like 5.30$
  [
    /^[-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?[\$\xA2-\xA5\u058F\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20BD\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6]\+?$/,
    ['Money', 'Value'],
  ],
  //like $400usd
  [/^[-+]?[\$£]?[0-9]([0-9,.])+?(usd|eur|jpy|gbp|cad|aud|chf|cny|hkd|nzd|kr|rub)$/i, ['Money', 'Value']],

  //numbers
  // 50 | -50 | 3.23  | 5,999.0  | 10+
  [/^[-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?\+?$/, ['Cardinal', 'NumericValue']],
  [/^[-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?(st|nd|rd|r?th)$/, ['Ordinal', 'NumericValue']],
  // .73th
  [/^\.[0-9]+\+?$/, ['Cardinal', 'NumericValue']],
  //percent
  [/^[-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?%\+?$/, ['Percent', 'Cardinal', 'NumericValue']],
  [/^\.[0-9]+%$/, ['Percent', 'Cardinal', 'NumericValue']],
  //fraction
  [/^[0-9]{1,4}\/[0-9]{1,4}(st|nd|rd|th)?s?$/, ['Fraction', 'NumericValue']],
  //range
  [/^[0-9.]{1,3}[a-z]{0,2}[-–—][0-9]{1,3}[a-z]{0,2}$/, ['Value', 'NumberRange']],
  //time-range
  [/^[0-9][0-9]?(:[0-9][0-9])?(am|pm)? ?[-–—] ?[0-9][0-9]?(:[0-9][0-9])?(am|pm)?$/, ['Time', 'NumberRange']],
  //with unit
  [/^[0-9.]+([a-z]{1,4})$/, 'Value'],

  // period-ones acronyms - f.b.i.
  [/^([A-Z]\.){2}[A-Z]?/i, 'Acronym'], //ascii-only
]
