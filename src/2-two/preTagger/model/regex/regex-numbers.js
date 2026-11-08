import { Time, Year, Date, Timezone, PhoneNumber, Val, Card, Numeric, Ord, Frac } from '../../tagSet/_lib.js'
export default [
  [/^@1?[0-9](am|pm)$/i, Time],
  [/^@1?[0-9]:[0-9]{2}(am|pm)?$/i, Time],
  [/^'[0-9]{2}$/, Year],
  // times
  [/^[012]?[0-9](:[0-5][0-9])(:[0-5][0-9])$/, Time],
  [/^[012]?[0-9](:[0-5][0-9])?(:[0-5][0-9])? ?(am|pm)$/i, Time],
  [/^[012]?[0-9](:[0-5][0-9])(:[0-5][0-9])? ?(am|pm)?$/i, Time], //can remove?

  // iso-dates
  [/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}/i, Date],
  [/^[0-9]{1,4}-[0-9]{1,2}-[0-9]{1,4}$/, Date],
  [/^[0-9]{1,4}\/[0-9]{1,2}\/([0-9]{4}|[0-9]{2})$/, Date],
  // needs a real day + month, and a 2 or 4-digit year (not 1.0.2, or 3.11.4)
  [/^[0-9]{4}\.(0?[1-9]|1[0-2])\.(0?[1-9]|[12][0-9]|3[01])$/, Date],
  [/^(0?[1-9]|[12][0-9]|3[01])\.(0?[1-9]|[12][0-9]|3[01])\.([0-9]{4}|[0-9]{2})$/, Date],
  [/^[0-9]{1,4}-[a-z]{2,9}-[0-9]{1,4}$/i, Date],

  // timezones
  [/^utc ?[+-]?[0-9]+$/, Timezone],
  [/^(gmt|utc)[+-][0-9]{1,2}$/i, Timezone],

  //phone numbers
  [/^[0-9]{3}-[0-9]{4}$/, PhoneNumber],
  [/^(\+?[0-9][ -])?[0-9]{3}[ -]?[0-9]{3}-[0-9]{4}$/, PhoneNumber],

  //money
  //like $5.30
  [/^[-+]?\p{Currency_Symbol}[-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?([kmb]|bn)?\+?$/u, ['Money', Val]],
  //like 5.30$
  [/^[-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?\p{Currency_Symbol}\+?$/u, ['Money', Val]],
  //like
  [/^[-+]?[$£]?[0-9]([0-9,.])+(usd|eur|jpy|gbp|cad|aud|chf|cny|hkd|nzd|kr|rub)$/i, ['Money', Val]],

  //numbers
  // 50 | -50 | 3.23  | 5,999.0  | 10+
  [/^[-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?\+?$/, [Card, Numeric]],
  // a positive integer - not '0th', '-1st' or '3.5th'
  [/^(?!0+[a-z])[0-9]+(,[0-9]{3})*(st|nd|rd|r?th)$/, [Ord, Numeric]],
  // .73th
  [/^\.[0-9]+\+?$/, [Card, Numeric]],
  //percent
  [/^[-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?%\+?$/, ['Percent', Card, Numeric]],
  [/^\.[0-9]+%$/, ['Percent', Card, Numeric]],
  //fraction
  [/^[0-9]+(\.[0-9]+)?\/[0-9]+(st|nd|rd|th)?s?$/, [Frac, Numeric]],
  //range
  [/^[0-9.]{1,3}[a-z]{0,2}[-–—][0-9]{1,3}[a-z]{0,2}$/, [Val, 'NumberRange']],
  //time-range
  [/^[0-9]{1,2}(:[0-9][0-9])?(am|pm)? ?[-–—] ?[0-9]{1,2}(:[0-9][0-9])?(am|pm)$/, [Time, 'NumberRange']],
  //number with unit
  // not a refused ordinal like '3.5th'
  [/^[0-9.]+(?!(st|nd|rd|th)s?$)([a-z°]{1,4})$/, Numeric],
]
