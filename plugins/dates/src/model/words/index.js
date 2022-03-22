import timezones from './timezones.js'
import dates from './dates.js'
import durations from './durations.js'
import holidays from './holidays.js'
import times from './times.js'

let lex = {
  'a couple': 'Value',
  thur: 'WeekDay',
  thurs: 'WeekDay',
}
const add = function (arr, tag) {
  arr.forEach(str => {
    lex[str] = tag
  })
}
add(Object.keys(timezones), 'Timezone')
add(dates, 'Date')
add(durations, 'Duration')
add(holidays, 'Holiday')
add(times, 'Time')
// console.log(lex['april fools'])
export default lex
