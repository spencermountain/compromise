// somewhat-intellegent response to end-before-start situations
const reverseMaybe = function (obj) {
  let start = obj.start
  let end = obj.end
  if (start.d.isAfter(end.d)) {
    // wednesday to sunday -> move end up a week
    if (start.isWeekDay && end.isWeekDay) {
      obj.end.next()
      return obj
    }
    // else, reverse them
    let tmp = start
    obj.start = end
    obj.end = tmp
  }
  return obj
}
export default reverseMaybe
