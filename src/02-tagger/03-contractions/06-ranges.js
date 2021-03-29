const isRange = /^([0-9.]{1,3}[a-z]{0,2})[-–—]([0-9]{1,3}[a-z]{0,2})$/i
const timeRange = /^([0-9][0-9]?(:[0-9][0-9])?(am|pm)?)[-–—]([0-9][0-9]?(:[0-9][0-9])?(am|pm)?)$/i
//split '2-4' into '2 to 4'
const checkRange = function (term) {
  if (term.tags.PhoneNumber === true) {
    return null
  }
  let parts = term.text.match(isRange)
  if (parts !== null) {
    return [parts[1], 'to', parts[2]]
  } else {
    parts = term.text.match(timeRange)
    if (parts !== null) {
      return [parts[1], 'to', parts[4]]
    }
  }
  return null
}
module.exports = checkRange
