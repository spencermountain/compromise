const getDuration = function (range) {
  let end = range.end.d.add(1, 'millisecond')
  let diff = end.since(range.start.d).diff
  delete diff.milliseconds
  delete diff.seconds
  return diff
}

const toJSON = function (range) {
  if (!range.start) {
    return {
      start: null,
      end: null,
      timezone: null,
      duration: {},
      // range: null
    }
  }
  let diff = range.end ? getDuration(range) : {}
  return {
    start: range.start.format('iso'),
    end: range.end ? range.end.format('iso') : null,
    timezone: range.start.d.format('timezone'),
    duration: diff,
    // range: getRange(diff)
  }
}
export default toJSON