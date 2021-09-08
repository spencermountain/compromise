const spacetime = require('spacetime')

const getDuration = function (date) {
  let start = date.start
  let end = date.end
  let duration = {}
  if (start && end) {
    start = spacetime(start)
    end = spacetime(end).add(1, 'millisecond')
    duration = start.diff(end)
    // we don't need these
    delete duration.milliseconds
    delete duration.seconds
    Object.keys(duration).forEach((k) => {
      if (duration[k] === 0) {
        delete duration[k]
      }
    })
  }
  return duration
}
module.exports = getDuration
