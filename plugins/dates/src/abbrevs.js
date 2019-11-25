let arr = [
  ['mon', 'monday'],
  ['tue', 'tuesday'],
  ['tues', 'tuesday'],
  ['wed', 'wednesday'],
  ['thu', 'thursday'],
  ['thurs', 'thursday'],
  ['fri', 'friday'],
  ['sat', 'saturday'],
  ['sun', 'sunday'],

  ['jan', 'january'],
  ['feb', 'february'],
  ['mar', 'march'],
  ['apr', 'april'],
  ['jun', 'june'],
  ['jul', 'july'],
  ['aug', 'august'],
  ['sep', 'september'],
  ['sept', 'september'],
  ['oct', 'october'],
  ['nov', 'november'],
  ['dec', 'december'],
]

arr = arr.map(a => {
  return { short: a[0], long: a[1] }
})

module.exports = arr
