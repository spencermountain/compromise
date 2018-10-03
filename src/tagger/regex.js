//these are regexes applied to t.text, instead of t.normal
module.exports = {
  //#funtime
  '^#[a-z]+': 'HashTag',
  //chillin'
  '^[a-z]+n[\'’]$': 'Gerund',
  //589-3809
  '^[0-9]{3}-[0-9]{4}$': 'PhoneNumber',
  //632-589-3809
  '^[0-9]{3}[ -]?[0-9]{3}-[0-9]{4}$': 'PhoneNumber',

  //dates/times
  '^[012]?[0-9](:[0-5][0-9])(:[0-5][0-9])$': 'Time', //4:32:32
  '^[012]?[0-9](:[0-5][0-9])?(:[0-5][0-9])? ?(am|pm)$': 'Time', //4pm
  '^[012]?[0-9](:[0-5][0-9])(:[0-5][0-9])? ?(am|pm)?$': 'Time', //4:00pm
  '^[PMCE]ST$': 'Time', //PST, time zone abbrevs
  '^utc ?[+-]?[0-9]+?$': 'Time', //UTC 8+
  '^[a-z0-9]*? o\'?clock$': 'Time', //3 oclock
  '^[0-9]{1,4}-[0-9]{1,2}-[0-9]{1,4}$': 'Date', // 03-02-89
  '^[0-9]{1,4}\/[0-9]{1,2}\/[0-9]{1,4}$': 'Date', // 03/02/89

  //money
  '^[-+]?[$€¥£][0-9]+(.[0-9]{1,2})?$': ['Money', 'Value'], //like $5.30
  '^[-+]?[$€¥£][0-9]{1,3}(,[0-9]{3})+(.[0-9]{1,2})?$': ['Money', 'Value'], //like $5,231.30

  //values
  '^[0-9\.]{1,4}(st|nd|rd|th)?[-–][0-9\.]{1,4}(st|nd|rd|th)?$': 'NumberRange', //'NumericValue'], //5-7
  // '^[0-9]{1,4}[-–][0-9]{1,4}$': 'NumberRange', //'NumericValue'], //5-7
  '^[-+]?[0-9.,]{1,3}(,[0-9.,]{3})+(.[0-9]+)?$': 'NiceNumber', //like 5,999.0
  '^[-+]?[0-9]+(.[0-9]+)?$': 'NumericValue', //like +5.0

  '^.?[0-9]+([0-9,.]+)?%$': ['Percent', 'Cardinal', 'NumericValue'], //7%  ..
  '^[0-9]{1,4}/[0-9]{1,4}$': 'Fraction', //3/2ths
  '^[0-9\.]{1,2}[-–][0-9]{1,2}$': ['Value', 'NumberRange'], //7-8
  //mc'adams
  '^ma?c\'.*': 'LastName',
  //o'douggan
  '^o\'[drlkn].*': 'LastName'
};
