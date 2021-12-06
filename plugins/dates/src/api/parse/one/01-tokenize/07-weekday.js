// pull-out 'thurs' from 'thurs next week'
const parseWeekday = function (doc) {
  let day = doc.match('#WeekDay')
  if (day.found && !doc.has('^#WeekDay$')) {
    // handle relative-day logic elsewhere.
    if (doc.has('(this|next|last) (next|upcoming|coming|past)? #WeekDay')) {
      return null
    }
    doc.remove(day)
    return day.text('reduced')
  }
  return null
}
export default parseWeekday
